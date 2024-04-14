const mongoose = require('mongoose');

const lineItemSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  minutes: { type: Number, required: true }
});

const timesheetSchema = new mongoose.Schema({
  description: { type: String, required: true },
  lineItems: [lineItemSchema],
  rate: { type: Number, required: true }
});

module.exports = mongoose.model('Timesheet', timesheetSchema);