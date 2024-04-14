import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TimesheetForm from './components/TimesheetForm';
import TimesheetList from './components/TimesheetList';
import './styles.css';

const PORT = 4000


function App() {
  const [timesheets, setTimesheets] = useState([]);
  const [form, setForm] = useState({
    description: '',
    lineItems: [{ date: '', minutes: 0 }],
    rate: 0,
  });

  useEffect(() => {
    async function fetchTimesheets() {
      try {
        const { data } = await axios.get(`http://localhost:${PORT}/timesheets`);
        setTimesheets(data);
      } catch (error) {
        console.error('Error fetching timesheets:', error);
      }
    }
    fetchTimesheets();
  }, []);

  return (
    <div className='container'>
      <h1>Evan Jordan's Timesheet Application™</h1>
      <TimesheetForm form={form} setForm={setForm} setTimesheets={setTimesheets} />
      <TimesheetList timesheets={timesheets} />
    </div>
  );
}

export default App
