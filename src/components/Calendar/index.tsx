import React, { useState } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

type CalendarPickerProps = {};

type CalendarDate = {
  day: number;
  month: number;
  year: number;
};

const monthNames: string[] = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const Calendar: React.FC<CalendarPickerProps> = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    const calendarDays: JSX.Element[] = [];

    for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
      const day = prevMonthDays - i + 1;
      calendarDays.push(
        <div key={`prev-${day}`} className="calendar-day calendar-day-prev">
          {day}
        </div>,
      );
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const isSelected = false; // TODO: Check if the current date is selected
      const day = i;
      calendarDays.push(
        <div
          key={`current-${day}`}
          className={`calendar-day ${isSelected ? 'calendar-day-selected' : ''}`}
        >
          {day}
        </div>,
      );
    }

    const totalDaysDisplayed = calendarDays.length;
    const remainingCells = 35 - totalDaysDisplayed;
    for (let i = 1; i <= remainingCells; i++) {
      const day = i;
      calendarDays.push(
        <div key={`next-${day}`} className="calendar-day calendar-day-next">
          {day}
        </div>,
      );
    }

    return calendarDays;
  };

  const handlePrevMonthClick = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      const newYear = prevMonth === 0 ? currentYear - 1 : currentYear;
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleNextMonthClick = () => {
    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      const newYear = prevMonth === 11 ? currentYear + 1 : currentYear;
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  return (
    <div className="calendar">
      <div className="calendar-space">
        <div className="calendar-header">
          <FontAwesomeIcon
            className="icon-back-month"
            icon={faAngleLeft}
            onClick={handlePrevMonthClick}
          />
          <h2 className="calendar-day-header">{`${monthNames[currentMonth]} ${currentYear}`}</h2>
          <FontAwesomeIcon
            className="icon-next-month"
            icon={faAngleRight}
            onClick={handleNextMonthClick}
          />
        </div>
        <div className="calendar-grid">
          <div className="calendar-day-label">Mon</div>
          <div className="calendar-day-label">Tue</div>
          <div className="calendar-day-label">Wed</div>
          <div className="calendar-day-label">Thu</div>
          <div className="calendar-day-label">Fri</div>
          <div className="calendar-day-label">Sat</div>
          <div className="calendar-day-label">Sun</div>
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
