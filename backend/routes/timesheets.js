const express = require('express');
const router = express.Router();
const Timesheet = require('../models/Timesheet');

router.post('/', async (req, res) => {
  try {
    const timesheet = new Timesheet({
      description: req.body.description,
      lineItems: req.body.lineItems,
      rate: req.body.rate
    });
    const newTimesheet = await timesheet.save();
    res.status(201).json(newTimesheet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const timesheets = await Timesheet.find();
    res.json(timesheets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
