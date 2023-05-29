import React, { useState } from 'react';
import './DatePicker.css';

interface DatePickerProps {
  onDateRangeChange: (startDate: Date | null, endDate: Date | null) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, isStart: boolean) => {
    const dateValue = event.target.value;
    const date = new Date(dateValue);

    if (isStart) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }

    onDateRangeChange(startDate, endDate);
  };

  return (
    <div className="datepicker">
      <input
        type="date"
        className="datepicker-input"
        value={startDate ? startDate.toISOString().split('T')[0] : ''}
        onChange={event => handleDateChange(event, true)}
      />
      <span className="datepicker-divider">-</span>
      <input
        type="date"
        className="datepicker-input"
        value={endDate ? endDate.toISOString().split('T')[0] : ''}
        onChange={event => handleDateChange(event, false)}
      />
    </div>
  );
};

export default DatePicker;
