const PORT = 4000;
const MONGODB_URI = 'mongodb://localhost:27017/Timesheet'

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const timesheetRoutes = require('./routes/timesheets');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use('/timesheets', timesheetRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
