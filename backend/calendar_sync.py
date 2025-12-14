"""
Google Calendar integration service for syncing bookings with Google Calendar
"""
import os
from datetime import datetime, timedelta
from typing import Optional, Dict, List
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from google.auth.transport.requests import Request
import json

# Google OAuth 2.0 configuration
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = os.getenv("GOOGLE_REDIRECT_URI", "https://www.petcarebooker.com/dashboard/calendar/callback")

# Scopes required for Google Calendar API
SCOPES = ['https://www.googleapis.com/auth/calendar']

def get_oauth_flow() -> Optional[Flow]:
    """Create OAuth 2.0 flow for Google Calendar"""
    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        print("⚠️ WARNING: Google Calendar credentials not configured")
        return None
    
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": GOOGLE_CLIENT_ID,
                "client_secret": GOOGLE_CLIENT_SECRET,
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
                "redirect_uris": [GOOGLE_REDIRECT_URI]
            }
        },
        scopes=SCOPES,
        redirect_uri=GOOGLE_REDIRECT_URI
    )
    return flow

def get_authorization_url(shop_id: int) -> Optional[str]:
    """Generate Google OAuth authorization URL"""
    flow = get_oauth_flow()
    if not flow:
        return None
    
    # Include shop_id in state for callback
    flow.state = json.dumps({"shop_id": shop_id})
    authorization_url, _ = flow.authorization_url(
        access_type='offline',
        include_granted_scopes='true',
        prompt='consent'  # Force consent to get refresh token
    )
    return authorization_url

def exchange_code_for_tokens(code: str, state: str) -> Optional[Dict]:
    """Exchange authorization code for access and refresh tokens"""
    flow = get_oauth_flow()
    if not flow:
        return None
    
    try:
        # Parse state to get shop_id
        state_data = json.loads(state) if state else {}
        shop_id = state_data.get("shop_id")
        
        # Exchange code for tokens
        flow.fetch_token(code=code)
        credentials = flow.credentials
        
        return {
            "access_token": credentials.token,
            "refresh_token": credentials.refresh_token,
            "token_uri": credentials.token_uri,
            "client_id": credentials.client_id,
            "client_secret": credentials.client_secret,
            "scopes": credentials.scopes,
            "expiry": credentials.expiry.isoformat() if credentials.expiry else None,
            "shop_id": shop_id
        }
    except Exception as e:
        print(f"❌ Failed to exchange code for tokens: {str(e)}")
        return None

def get_calendar_service(access_token: str, refresh_token: str) -> Optional[object]:
    """Create Google Calendar API service from tokens"""
    if not access_token:
        return None
    
    try:
        credentials = Credentials(
            token=access_token,
            refresh_token=refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=GOOGLE_CLIENT_ID,
            client_secret=GOOGLE_CLIENT_SECRET,
            scopes=SCOPES
        )
        
        # Refresh token if expired
        if credentials.expired:
            credentials.refresh(Request())
        
        service = build('calendar', 'v3', credentials=credentials)
        return service
    except Exception as e:
        print(f"❌ Failed to create calendar service: {str(e)}")
        return None

def create_calendar_event(
    service: object,
    calendar_id: str,
    booking_title: str,
    start_time: datetime,
    end_time: datetime,
    description: str,
    customer_email: str,
    customer_phone: str
) -> Optional[str]:
    """Create a Google Calendar event from a booking"""
    try:
        event = {
            'summary': booking_title,
            'description': description,
            'start': {
                'dateTime': start_time.isoformat(),
                'timeZone': 'America/New_York',  # TODO: Make timezone configurable
            },
            'end': {
                'dateTime': end_time.isoformat(),
                'timeZone': 'America/New_York',
            },
            'attendees': [
                {'email': customer_email} if customer_email else None
            ],
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},  # 1 day before
                    {'method': 'popup', 'minutes': 60},  # 1 hour before
                ],
            },
        }
        
        # Remove None attendees
        event['attendees'] = [a for a in event['attendees'] if a]
        
        created_event = service.events().insert(
            calendarId=calendar_id,
            body=event
        ).execute()
        
        return created_event.get('id')
    except HttpError as e:
        print(f"❌ Failed to create calendar event: {str(e)}")
        return None
    except Exception as e:
        print(f"❌ Error creating calendar event: {str(e)}")
        return None

def update_calendar_event(
    service: object,
    calendar_id: str,
    event_id: str,
    booking_title: str,
    start_time: datetime,
    end_time: datetime,
    description: str
) -> bool:
    """Update an existing Google Calendar event"""
    try:
        # Get existing event
        event = service.events().get(
            calendarId=calendar_id,
            eventId=event_id
        ).execute()
        
        # Update event
        event['summary'] = booking_title
        event['description'] = description
        event['start'] = {
            'dateTime': start_time.isoformat(),
            'timeZone': 'America/New_York',
        }
        event['end'] = {
            'dateTime': end_time.isoformat(),
            'timeZone': 'America/New_York',
        }
        
        service.events().update(
            calendarId=calendar_id,
            eventId=event_id,
            body=event
        ).execute()
        
        return True
    except HttpError as e:
        print(f"❌ Failed to update calendar event: {str(e)}")
        return False
    except Exception as e:
        print(f"❌ Error updating calendar event: {str(e)}")
        return False

def delete_calendar_event(
    service: object,
    calendar_id: str,
    event_id: str
) -> bool:
    """Delete a Google Calendar event"""
    try:
        service.events().delete(
            calendarId=calendar_id,
            eventId=event_id
        ).execute()
        return True
    except HttpError as e:
        # Event might already be deleted, that's okay
        if e.resp.status == 404:
            return True
        print(f"❌ Failed to delete calendar event: {str(e)}")
        return False
    except Exception as e:
        print(f"❌ Error deleting calendar event: {str(e)}")
        return False

def get_busy_times(
    service: object,
    calendar_id: str,
    start_time: datetime,
    end_time: datetime
) -> List[Dict]:
    """Get busy times from Google Calendar to prevent double-booking"""
    try:
        freebusy_query = {
            'timeMin': start_time.isoformat(),
            'timeMax': end_time.isoformat(),
            'items': [{'id': calendar_id}]
        }
        
        freebusy = service.freebusy().query(body=freebusy_query).execute()
        busy_periods = freebusy.get('calendars', {}).get(calendar_id, {}).get('busy', [])
        
        return busy_periods
    except HttpError as e:
        print(f"❌ Failed to get busy times: {str(e)}")
        return []
    except Exception as e:
        print(f"❌ Error getting busy times: {str(e)}")
        return []

def get_primary_calendar_id(service: object) -> Optional[str]:
    """Get the primary Google Calendar ID for the authenticated user"""
    try:
        calendar_list = service.calendarList().list().execute()
        for calendar in calendar_list.get('items', []):
            if calendar.get('primary'):
                return calendar.get('id')
        # If no primary found, return first calendar
        calendars = calendar_list.get('items', [])
        if calendars:
            return calendars[0].get('id')
        return None
    except HttpError as e:
        print(f"❌ Failed to get primary calendar: {str(e)}")
        return None
    except Exception as e:
        print(f"❌ Error getting primary calendar: {str(e)}")
        return None

def refresh_access_token(refresh_token: str) -> Optional[Dict]:
    """Refresh an expired access token"""
    if not refresh_token:
        return None
    
    try:
        credentials = Credentials(
            token=None,
            refresh_token=refresh_token,
            token_uri="https://oauth2.googleapis.com/token",
            client_id=GOOGLE_CLIENT_ID,
            client_secret=GOOGLE_CLIENT_SECRET,
            scopes=SCOPES
        )
        
        credentials.refresh(Request())
        
        return {
            "access_token": credentials.token,
            "expiry": credentials.expiry.isoformat() if credentials.expiry else None
        }
    except Exception as e:
        print(f"❌ Failed to refresh access token: {str(e)}")
        return None

