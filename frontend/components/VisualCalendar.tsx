'use client';

import { useState } from 'react';

interface VisualCalendarProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
  minDate?: string;
  maxDate?: string;
}

export default function VisualCalendar({ onDateSelect, selectedDate, minDate, maxDate }: VisualCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Get month/year info
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  
  // Get first day of month and total days
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Create calendar grid
  const calendarDays: (number | null)[] = [];
  
  // Add empty slots for days before month starts
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }
  
  // Navigation
  const goToPrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };
  
  // Check if date is selectable
  const isDateSelectable = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const date = new Date(dateStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    if (minDate && dateStr < minDate) return false;
    if (maxDate && dateStr > maxDate) return false;
    
    return true;
  };
  
  // Check if date is selected
  const isDateSelected = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return dateStr === selectedDate;
  };
  
  // Check if date is today
  const isToday = (day: number) => {
    const today = new Date();
    return day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
  };
  
  const handleDateClick = (day: number) => {
    if (!isDateSelectable(day)) return;
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onDateSelect(dateStr);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={goToPrevMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Previous month"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="text-xl font-bold text-gray-900">
          {monthName}
        </h3>
        
        <button
          type="button"
          onClick={goToNextMonth}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Next month"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-bold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((day, index) => {
          if (day === null) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }
          
          const selectable = isDateSelectable(day);
          const selected = isDateSelected(day);
          const today = isToday(day);
          
          return (
            <button
              key={day}
              type="button"
              onClick={() => handleDateClick(day)}
              disabled={!selectable}
              className={`
                aspect-square rounded-xl font-semibold text-sm transition-all
                ${selected 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg scale-110 ring-4 ring-purple-200' 
                  : selectable
                    ? 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-400 hover:bg-purple-50 hover:scale-105'
                    : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                }
                ${today && !selected ? 'ring-2 ring-purple-400' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded ring-2 ring-purple-400"></div>
          <span>Today</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-600 to-pink-500"></div>
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded bg-gray-50"></div>
          <span>Unavailable</span>
        </div>
      </div>
    </div>
  );
}

