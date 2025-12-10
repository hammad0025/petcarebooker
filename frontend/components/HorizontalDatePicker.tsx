'use client';

import { useState, useEffect } from 'react';

interface HorizontalDatePickerProps {
  onDateSelect: (date: string) => void;
  selectedDate: string;
  minDate?: string;
  maxDate?: string;
}

export default function HorizontalDatePicker({ onDateSelect, selectedDate, minDate, maxDate }: HorizontalDatePickerProps) {
  const [startDate, setStartDate] = useState(new Date());

  // Generate 14 days starting from startDate
  const generateDates = () => {
    const dates = [];
    const current = new Date(startDate);
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(current);
      date.setDate(current.getDate() + i);
      dates.push(date);
    }
    
    return dates;
  };

  const dates = generateDates();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const formatDateValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const isDateSelectable = (date: Date) => {
    const dateStr = formatDateValue(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;
    if (minDate && dateStr < minDate) return false;
    if (maxDate && dateStr > maxDate) return false;
    
    return true;
  };

  const isDateSelected = (date: Date) => {
    return formatDateValue(date) === selectedDate;
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };

  const goToPrevWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() - 7);
    
    // Don't go before today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (newDate >= today) {
      setStartDate(newDate);
    } else {
      setStartDate(today);
    }
  };

  const goToNextWeek = () => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + 7);
    setStartDate(newDate);
  };

  const handleDateClick = (date: Date) => {
    if (!isDateSelectable(date)) return;
    onDateSelect(formatDateValue(date));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      {/* Month/Year Header */}
      <div className="text-center mb-3">
        <h3 className="text-lg font-bold text-gray-900">
          {dates[0].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          {dates[dates.length - 1].getMonth() !== dates[0].getMonth() && 
            ` - ${dates[dates.length - 1].toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
          }
        </h3>
      </div>

      {/* Horizontal Date Scroller - Booksy Style */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goToPrevWeek}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          aria-label="Previous week"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max px-1">
            {dates.map((date, index) => {
              const selectable = isDateSelectable(date);
              const selected = isDateSelected(date);
              const today = isToday(date);
              
              const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' });
              const dayOfMonth = date.getDate();
              
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleDateClick(date)}
                  disabled={!selectable}
                  className={`
                    flex-shrink-0 w-16 py-3 rounded-lg font-semibold text-center transition-all
                    ${selected 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md scale-105' 
                      : selectable
                        ? 'bg-white border-2 border-gray-200 text-gray-900 hover:border-purple-400 hover:bg-purple-50'
                        : 'bg-gray-50 text-gray-300 cursor-not-allowed border-2 border-gray-100'
                    }
                    ${today && !selected ? 'border-purple-400' : ''}
                  `}
                >
                  <div className={`text-xs mb-1 ${selected ? 'text-white' : 'text-gray-600'}`}>
                    {dayOfWeek}
                  </div>
                  <div className={`text-lg font-bold ${selected ? 'text-white' : 'text-gray-900'}`}>
                    {dayOfMonth}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={goToNextWeek}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors shrink-0"
          aria-label="Next week"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}

