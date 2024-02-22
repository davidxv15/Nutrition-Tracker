import React from "react";

const Calendar = ({}) => {
    return (
<div className="calendar__component">
    <h2>Daily Caloric Intake</h2>
    <Calendar
      onChange={handleDateChange}
      value={date} />

      <p>Calories for {date.toDateString()}: {dailyIntake[date.toDateString()] || 0}</p>
      </div>
);
};

      export default Calendar;
