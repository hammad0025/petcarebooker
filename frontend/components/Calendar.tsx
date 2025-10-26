'use client';

import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Booking {
  id: number;
  customer_name: string;
  pet_name: string;
  pet_type: string;
  pet_breed: string;
  appointment_date: string;
  duration_minutes: number;
  status: string;
  service: {
    name: string;
    price: number;
  };
}

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  resource: Booking;
}

interface CalendarProps {
  bookings: Booking[];
  onSelectEvent: (event: CalendarEvent) => void;
  onSelectSlot?: (slotInfo: { start: Date; end: Date }) => void;
}

const eventStyleGetter = (event: CalendarEvent) => {
  let backgroundColor = '#9333EA'; // purple
  
  switch (event.resource.status) {
    case 'pending':
      backgroundColor = '#EAB308'; // yellow
      break;
    case 'confirmed':
      backgroundColor = '#10B981'; // green
      break;
    case 'completed':
      backgroundColor = '#3B82F6'; // blue
      break;
    case 'cancelled':
      backgroundColor = '#EF4444'; // red
      break;
  }

  return {
    style: {
      backgroundColor,
      borderRadius: '6px',
      opacity: 0.9,
      color: 'white',
      border: '0px',
      display: 'block',
      fontSize: '13px',
      fontWeight: '500',
    },
  };
};

export default function Calendar({ bookings, onSelectEvent, onSelectSlot }: CalendarProps) {
  const events: CalendarEvent[] = bookings.map((booking) => {
    const start = new Date(booking.appointment_date);
    const end = new Date(start.getTime() + booking.duration_minutes * 60000);
    
    return {
      id: booking.id,
      title: `${booking.pet_name} - ${booking.service.name}`,
      start,
      end,
      resource: booking,
    };
  });

  return (
    <div className="bg-white rounded-xl shadow p-6" style={{ height: '700px' }}>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
        eventPropGetter={eventStyleGetter}
        onSelectEvent={onSelectEvent}
        onSelectSlot={onSelectSlot}
        selectable
        views={['month', 'week', 'day']}
        defaultView="week"
        popup
        tooltipAccessor={(event) => 
          `${event.resource.customer_name} - ${event.resource.pet_name}\n${event.resource.service.name}`
        }
      />
    </div>
  );
}

