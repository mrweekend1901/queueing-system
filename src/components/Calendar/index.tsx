import React, { useState, useEffect } from 'react';
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

// Định nghĩa kiểu dữ liệu cho một ngày trong lịch
type CalendarDate = {
  day: number;
  month: number;
  year: number;
};

// Mảng các tên tháng trong năm
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

const Calendar: React.FC = () => {
  // Sử dụng hook useState để lưu trữ ngày được chọn
  const [selectedDate, setSelectedDate] = useState<CalendarDate | null>(null);

  //Ngày hiện tại khi lần đầu render
  useEffect(() => {
    setCurrentDate();
  }, []);

  // Xử lý sự kiện khi ngày được nhấp
  const handleDateClick = (day: number, month: number, year: number) => {
    setSelectedDate({ day, month, year });
  };

  // Đặt ngày hiện tại là ngày đã chọn ban đầu
  const setCurrentDate = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    setSelectedDate({
      day: currentDay,
      month: currentMonth,
      year: currentYear,
    });
  };

  // Render lịch
  const renderCalendar = (): JSX.Element[] => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Xác định số ngày trong tháng hiện tại
    const numDaysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Xác định ngày đầu tiên của tháng hiện tại là ngày nào trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    // Xác định ngày bắt đầu hiển thị các ngày trống của tháng trước
    const startingDay = firstDayOfMonth === 0 ? 7 : firstDayOfMonth;

    // Xác định ngày cuối cùng của tháng hiện tại là ngày nào trong tuần (0: Chủ nhật, 1: Thứ 2, ..., 6: Thứ 7)
    const lastDayOfMonth = new Date(currentYear, currentMonth, numDaysInMonth).getDay();

    // Xác định ngày kết thúc hiển thị các ngày trống của tháng sau
    const endingDay = lastDayOfMonth === 0 ? 7 : 7 - lastDayOfMonth;

    const calendar: JSX.Element[] = [];

    // Render các ngày trống của tháng trước
    for (let i = startingDay - 1; i > 0; i--) {
      const day = numDaysInMonth - i + 1;
      const classNames = `calendar-day empty prev-month-day`;

      calendar.push(
        <div
          key={`empty-prev-${i}`}
          className={classNames}
          onClick={() => handleDateClick(day, currentMonth - 1, currentYear)}
        >
          {day}
        </div>,
      );
    }

    // Render các ngày trong tháng hiện tại
    for (let day = 1; day <= numDaysInMonth; day++) {
      const isCurrentDay =
        currentYear === currentYear && currentMonth === currentMonth && day === currentDay;

      const isSelectedDay =
        selectedDate &&
        currentYear === selectedDate.year &&
        currentMonth === selectedDate.month &&
        day === selectedDate.day;

      const classNames = `calendar-day ${isCurrentDay ? 'current-day' : ''} ${
        isSelectedDay ? 'selected-day' : ''
      }`;

      calendar.push(
        <div
          key={`day-${day}`}
          className={classNames}
          onClick={() => handleDateClick(day, currentMonth, currentYear)}
        >
          {day}
        </div>,
      );
    }

    // Render các ngày trống của tháng sau
    for (let i = 1; i <= endingDay; i++) {
      const classNames = `calendar-day empty next-month-day`;
      const day = i;

      calendar.push(
        <div
          key={`empty-next-${i}`}
          className={classNames}
          onClick={() => handleDateClick(day, currentMonth + 1, currentYear)}
        >
          {day}
        </div>,
      );
    }

    return calendar;
  };

  return (
    <div className="calendar">
      <div className="calendar-space">
        <div className="calendar-header">
          <FontAwesomeIcon className="icon-back-month" icon={faAngleLeft} />
          <h2 className="calendar-day-header">
            {selectedDate
              ? `${selectedDate.day} ${monthNames[selectedDate.month]} ${selectedDate.year}`
              : ''}
          </h2>
          <FontAwesomeIcon className="icon-next-month" icon={faAngleRight} />
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
