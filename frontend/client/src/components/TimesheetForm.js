import React from 'react';
import axios from 'axios';
import '../styles.css';

const PORT = 4000;

function TimesheetForm({ setTimesheets }) {
  const [form, setForm] = React.useState({
    description: '',
    lineItems: [{ date: '', minutes: 0 }],
    rate: 0,
  });

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    if (name === 'description' || name === 'rate') {
      setForm({ ...form, [name]: value });
    } else {
      const lineItems = [...form.lineItems];
      lineItems[index] = { ...lineItems[index], [name]: value };
      setForm({ ...form, lineItems });
    }
  };

  const addLineItem = () => {
    const newLineItems = [...form.lineItems, { date: '', minutes: 0 }];
    setForm({ ...form, lineItems: newLineItems });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:${PORT}/timesheets`, form);
      setTimesheets(prev => [...prev, data]);
      setForm({ description: '', lineItems: [{ date: '', minutes: 0 }], rate: 0 });
    } catch (error) {
      console.error('Failed to save timesheet:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="timesheet-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => handleInputChange(e)}
            className="input"
          />
        </div>
        {form.lineItems.map((item, index) => (
          <div key={index} className="form-group">
            <label className="form-label" htmlFor={`date-${index}`}>Date:</label>
            <input
              type="date"
              id={`date-${index}`}
              name="date"
              value={item.date}
              onChange={(e) => handleInputChange(e, index)}
              className="input"
            />
            <label className="form-label" htmlFor={`minutes-${index}`}>Minutes:</label>
            <input
              type="number"
              id={`minutes-${index}`}
              name="minutes"
              value={item.minutes}
              onChange={(e) => handleInputChange(e, index)}
              className="input"
            />
          </div>
        ))}
        <button type="button" onClick={addLineItem} className="add-button">Add Additional Line Item</button>
        <div className="form-group">
          <label className="form-label" htmlFor="rate">Rate per hour:</label>
          <input
            type="number"
            id="rate"
            name="rate"
            value={form.rate}
            onChange={handleInputChange}
            className="input"
          />
        </div>
        <button type="submit" className="save-button">Save Timesheet</button>
      </form>
    </div>
  );
}

export default TimesheetForm;
