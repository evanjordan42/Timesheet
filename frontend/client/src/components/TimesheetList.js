import React from 'react';
import '../styles.css';


function TimesheetList({ timesheets }) {
  return (
    <div>
      <h2>Saved Timesheets</h2>
      {timesheets.map((timesheet, idx) => (
        <div key={idx} className="timesheet-item">
          <h3>{timesheet.description}</h3>
          <p>Total Minutes: {timesheet.lineItems.reduce((sum, item) => sum + item.minutes, 0)}</p>
          <p>Total Cost: ${(timesheet.rate * timesheet.lineItems.reduce((sum, item) => sum + item.minutes, 0) / 60).toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
}

export default TimesheetList;
