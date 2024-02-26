import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarComponent = ({ date, handleDateChange }) => {
  return (
    <div className="calendar__container">
      <h2>Calendar</h2>
      <Calendar onChange={handleDateChange} value={date} />
    </div>
  );
};

export default CalendarComponent;
