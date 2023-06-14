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

interface CalendarState {
  currentMonth: number;
  currentYear: number;
  selectedDate: CalendarDate | null;
}

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

const Calendar: React.FC<CalendarPickerProps> = (): JSX.Element => {
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  const renderCalendar = (): JSX.Element[] => {
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
      const isSelected =
        selectedDate?.day === i &&
        selectedDate?.month === currentMonth &&
        selectedDate?.year === currentYear;
      const day = i;
      calendarDays.push(
        <div
          key={`current-${day}`}
          className={`calendar-day ${isSelected ? 'calendar-day-selected' : ''}`}
          onClick={() => handleDateClick(day)}
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

  const handlePrevMonthClick = (): void => {
    setCurrentMonth((prevMonth: number) => {
      const newMonth: number = prevMonth === 0 ? 11 : prevMonth - 1;
      const newYear: number = prevMonth === 0 ? currentYear - 1 : currentYear;
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleNextMonthClick = (): void => {
    setCurrentMonth((prevMonth: number) => {
      const newMonth: number = prevMonth === 11 ? 0 : prevMonth + 1;
      const newYear: number = prevMonth === 11 ? currentYear + 1 : currentYear;
      setCurrentYear(newYear);
      return newMonth;
    });
  };

  const handleDateClick = (day: number): void => {
    const clickedDate: CalendarDate = {
      day,
      month: currentMonth,
      year: currentYear,
    };

    setSelectedDate(clickedDate);
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
          <h2 className="calendar-day-header">
            {selectedDate &&
              `${selectedDate?.day} ${monthNames[selectedDate?.month || 0]} ${selectedDate?.year}`}
          </h2>
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
