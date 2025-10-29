import os
import stripe
from datetime import datetime, timedelta
from typing import Optional, Dict

# Initialize Stripe
STRIPE_SECRET_KEY = os.getenv("STRIPE_SECRET_KEY")
stripe.api_key = STRIPE_SECRET_KEY


def create_stripe_customer(email: str, name: str) -> Optional[str]:
    """
    Create a Stripe customer for a groomer
    
    Args:
        email: Customer email
        name: Customer name
        
    Returns:
        Stripe customer ID or None if failed
    """
    if not STRIPE_SECRET_KEY:
        print("⚠️ WARNING: STRIPE_SECRET_KEY not configured. Skipping Stripe customer creation.")
        return None
    
    try:
        customer = stripe.Customer.create(
            email=email,
            name=name,
        )
        return customer.id
    except Exception as e:
        print(f"❌ Failed to create Stripe customer: {str(e)}")
        return None


def create_subscription_checkout_session(
    customer_id: str,
    success_url: str,
    cancel_url: str,
    shop_id: int
) -> Optional[Dict]:
    """
    Create a Stripe Checkout session for subscription
    
    Args:
        customer_id: Stripe customer ID
        success_url: URL to redirect after successful payment
        cancel_url: URL to redirect after cancelled payment
        shop_id: Shop ID to track in metadata
        
    Returns:
        Checkout session dict with session_id and url, or None if failed
    """
    if not STRIPE_SECRET_KEY:
        print("⚠️ WARNING: STRIPE_SECRET_KEY not configured. Skipping checkout session creation.")
        return None
    
    try:
        session = stripe.checkout.Session.create(
            customer=customer_id,
            payment_method_types=['card'],
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': 'PetCareBooker Subscription',
                        'description': 'Monthly subscription for groomers - Basic Plan',
                    },
                    'unit_amount': 2499,  # $24.99 in cents
                    'recurring': {
                        'interval': 'month',
                    },
                },
                'quantity': 1,
            }],
            mode='subscription',
            success_url=success_url,
            cancel_url=cancel_url,
            metadata={
                'shop_id': str(shop_id),
            },
        )
        
        return {
            'session_id': session.id,
            'url': session.url,
        }
    except Exception as e:
        print(f"❌ Failed to create checkout session: {str(e)}")
        return None


def get_subscription_details(subscription_id: str) -> Optional[Dict]:
    """
    Get subscription details from Stripe
    
    Args:
        subscription_id: Stripe subscription ID
        
    Returns:
        Subscription details dict or None if failed
    """
    if not STRIPE_SECRET_KEY:
        return None
    
    try:
        subscription = stripe.Subscription.retrieve(subscription_id)
        return {
            'id': subscription.id,
            'status': subscription.status,
            'current_period_end': datetime.fromtimestamp(subscription.current_period_end),
            'cancel_at_period_end': subscription.cancel_at_period_end,
        }
    except Exception as e:
        print(f"❌ Failed to get subscription details: {str(e)}")
        return None


def cancel_subscription(subscription_id: str) -> bool:
    """
    Cancel a Stripe subscription
    
    Args:
        subscription_id: Stripe subscription ID
        
    Returns:
        True if successful, False otherwise
    """
    if not STRIPE_SECRET_KEY:
        print("⚠️ WARNING: STRIPE_SECRET_KEY not configured.")
        return False
    
    try:
        stripe.Subscription.modify(
            subscription_id,
            cancel_at_period_end=True,
        )
        return True
    except Exception as e:
        print(f"❌ Failed to cancel subscription: {str(e)}")
        return False


def handle_webhook_event(event: Dict) -> Optional[str]:
    """
    Handle Stripe webhook events
    
    Args:
        event: Stripe event object
        
    Returns:
        Shop ID affected by the event, or None
    """
    event_type = event.get('type')
    data = event.get('data', {})
    object_data = data.get('object', {})
    
    if event_type == 'checkout.session.completed':
        # Customer completed checkout
        metadata = object_data.get('metadata', {})
        shop_id = metadata.get('shop_id')
        subscription_id = object_data.get('subscription')
        customer_id = object_data.get('customer')
        
        if shop_id and subscription_id and customer_id:
            return {
                'shop_id': int(shop_id),
                'subscription_id': subscription_id,
                'customer_id': customer_id,
                'action': 'activate_subscription',
            }
    
    elif event_type == 'customer.subscription.deleted':
        # Subscription was cancelled
        metadata = object_data.get('metadata', {})
        shop_id = metadata.get('shop_id')
        
        if shop_id:
            return {
                'shop_id': int(shop_id),
                'action': 'cancel_subscription',
            }
    
    elif event_type == 'invoice.payment_succeeded':
        # Payment succeeded (renewal)
        subscription_id = object_data.get('subscription')
        
        if subscription_id:
            return {
                'subscription_id': subscription_id,
                'action': 'renew_subscription',
            }
    
    elif event_type == 'invoice.payment_failed':
        # Payment failed
        subscription_id = object_data.get('subscription')
        
        if subscription_id:
            return {
                'subscription_id': subscription_id,
                'action': 'payment_failed',
            }
    
    return None

