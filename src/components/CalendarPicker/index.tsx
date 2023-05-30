import React, { useState } from 'react';
import '../CalendarPicker/CalendarPicker.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faCalendarDays,
  faCaretRight,
} from '@fortawesome/free-solid-svg-icons';

// Định nghĩa kiểu dữ liệu cho ngày trong lịch
type CalendarDate = {
  day: number;
  month: number;
  year: number;
};

// Tên các tháng trong năm
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

const CalendarPicker: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth()); // Tháng hiện tại
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // Năm hiện tại
  const [selectedStartDate, setSelectedStartDate] = useState<CalendarDate | null>(null); // Ngày bắt đầu được chọn
  const [selectedEndDate, setSelectedEndDate] = useState<CalendarDate | null>(null); // Ngày kết thúc được chọn
  const [isOpen, setIsOpen] = useState(false); // Trạng thái mở/đóng calendar-picker

  // Render lịch
  const renderCalendar = () => {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // Ngày đầu tiên trong tháng
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate(); // Số ngày trong tháng
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate(); // Số ngày của tháng trước
    const calendarDays: JSX.Element[] = [];

    // Render các ngày của tháng trước
    for (let i = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1; i > 0; i--) {
      const day = prevMonthDays - i + 1;
      calendarDays.push(
        <div key={`prev-${day}`} className="calendar-day calendar-day-prev">
          {day}
        </div>,
      );
    }

    // Render các ngày của tháng hiện tại
    for (let i = 1; i <= daysInMonth; i++) {
      const day = i;
      const isSelected = isDateSelected(currentYear, currentMonth, day); // Kiểm tra xem ngày có được chọn hay không
      const isStartDay = selectedStartDate && selectedStartDate.day === day; // Kiểm tra xem ngày có phải là ngày bắt đầu hay không
      const isEndDay = selectedEndDate && selectedEndDate.day === day; // Kiểm tra xem ngày có phải là ngày kết thúc hay không

      const dayClassName = `calendar-day ${isSelected ? 'calendar-day-selected' : ''} ${
        isStartDay ? 'calendar-day-start' : ''
      } ${isEndDay ? 'calendar-day-end' : ''}`;

      calendarDays.push(
        <div
          key={`current-${day}`}
          className={dayClassName}
          onClick={() => handleDateClick(currentYear, currentMonth, day)}
        >
          {day}
        </div>,
      );
    }

    const totalDaysDisplayed = calendarDays.length;
    const remainingCells = 35 - totalDaysDisplayed;

    // Render các ngày của tháng tiếp theo
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

  // Xử lý khi người dùng nhấp vào input để mở/đóng calendar-picker
  const handleToggleCalendar = () => {
    setIsOpen(!isOpen);
  };

  // Kiểm tra xem ngày có được chọn hay không
  const isDateSelected = (year: number, month: number, day: number) => {
    if (!selectedStartDate || !selectedEndDate) return false;
    const selectedStartTime = new Date(
      selectedStartDate.year,
      selectedStartDate.month,
      selectedStartDate.day,
    ).getTime();
    const selectedEndTime = new Date(
      selectedEndDate.year,
      selectedEndDate.month,
      selectedEndDate.day,
    ).getTime();
    const currentTime = new Date(year, month, day).getTime();
    return currentTime >= selectedStartTime && currentTime <= selectedEndTime;
  };

  // Xử lý khi người dùng chọn một ngày trong lịch
  const handleDateClick = (year: number, month: number, day: number) => {
    const clickedDate: CalendarDate = {
      day,
      month,
      year,
    };

    if (!selectedStartDate) {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    } else if (!selectedEndDate) {
      // Kiểm tra xem ngày được chọn có nằm trước ngày bắt đầu không
      const startDate = new Date(
        selectedStartDate.year,
        selectedStartDate.month,
        selectedStartDate.day,
      );
      const clickedDateObj = new Date(year, month, day);
      if (clickedDateObj < startDate) {
        setSelectedStartDate(clickedDate);
        setSelectedEndDate(selectedStartDate);
        setSelectedStartDate(clickedDate);
      } else {
        setSelectedEndDate(clickedDate);
        setIsOpen(false); // Ẩn calendar-picker sau khi endDay được chọn
      }
    } else {
      setSelectedStartDate(clickedDate);
      setSelectedEndDate(null);
    }
  };

  // Xử lý khi người dùng nhấn nút chuyển đến tháng trước
  const handlePrevMonthClick = () => {
    // Xóa ngày đã chọn
    setSelectedStartDate(null);
    setSelectedEndDate(null);

    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 0 ? 11 : prevMonth - 1;
      if (newMonth === 11 && prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
      }
      return newMonth;
    });
  };

  // Xử lý khi người dùng nhấn nút chuyển đến tháng tiếp theo
  const handleNextMonthClick = () => {
    // Xóa ngày đã chọn
    setSelectedStartDate(null);
    setSelectedEndDate(null);

    setCurrentMonth(prevMonth => {
      const newMonth = prevMonth === 11 ? 0 : prevMonth + 1;
      if (newMonth === 0 && prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
      }
      return newMonth;
    });
  };

  return (
    <div className="main">
      <span className="calendar-input-group">
        <FontAwesomeIcon className="calendar-icon" icon={faCalendarDays} />
        <input
          placeholder="dd/mm/yy"
          type="text"
          name="startDay"
          className={`date__from ${isOpen ? 'calendar-input-active' : ''}`}
          value={
            selectedStartDate
              ? `${selectedStartDate.day}/${selectedStartDate.month}/${selectedStartDate.year}`
              : ''
          }
          onClick={handleToggleCalendar}
          readOnly
        />
      </span>
      <FontAwesomeIcon icon={faCaretRight} className="date__icon" />
      <span className="calendar-input-group">
        <FontAwesomeIcon className="calendar-icon" icon={faCalendarDays} />
        <input
          placeholder="dd/mm/yy"
          type="text"
          name="endDay"
          className={`date__to ${isOpen ? 'calendar-input-active' : ''}`}
          value={
            selectedEndDate
              ? `${selectedEndDate.day}/${selectedEndDate.month}/${selectedEndDate.year}`
              : ''
          }
          onClick={handleToggleCalendar}
          readOnly
        />
      </span>
      {isOpen && (
        <div className="calendar-picker">
          <div className="calendar-space">
            <div className="calendar-header">
              <FontAwesomeIcon
                className="icon-back-month"
                icon={faAngleLeft}
                onClick={handlePrevMonthClick}
              />
              <h2 className="calendar-day-header">
                {selectedStartDate && selectedEndDate
                  ? `${selectedStartDate.day} - ${selectedEndDate.day} ${
                      monthNames[selectedEndDate.month]
                    } ${selectedEndDate.year}`
                  : selectedStartDate
                  ? `${selectedStartDate.day} ${monthNames[selectedStartDate.month]} ${
                      selectedStartDate.year
                    }`
                  : ''}
              </h2>
              <FontAwesomeIcon
                className="icon-next-month"
                icon={faAngleRight}
                onClick={handleNextMonthClick}
              />
            </div>
            <div className="calendar-grid">
              <span className="calendar-grid-head">
                <div className="calendar-day-label">Mon</div>
                <div className="calendar-day-label">Tue</div>
                <div className="calendar-day-label">Wed</div>
                <div className="calendar-day-label">Thu</div>
                <div className="calendar-day-label">Fri</div>
                <div className="calendar-day-label">Sat</div>
                <div className="calendar-day-label">Sun</div>
              </span>
              <span className="calendar-grid-body">{renderCalendar()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarPicker;
