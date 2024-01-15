import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import {DesktopTimePicker} from '@mui/x-date-pickers/DesktopTimePicker';

const StaffDashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [combinedDateTime, setCombinedDateTime] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const [schedule, setSchedule] = useState({
    user: [user.id],
    date: [selectedDate],
    time: [selectedTime],
    isAvailable: [true],
    speciality: []
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
    combineDateTime(date, selectedTime);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    combineDateTime(selectedDate, time);
  };

  const combineDateTime = (date, time) => {
    if (date && time) {
      const combinedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        time.getHours(),
        time.getMinutes()
      );
      setCombinedDateTime(combinedDateTime);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div>
        <DesktopDatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          // slotProps={(params) => <TextField {...params} />}
        />
      </div>
      <div>
        <DesktopTimePicker
          label="Select Time"
          value={selectedTime}
          onChange={handleTimeChange}
          // slotProps={(params) => <TextField {...params} />}
        />
      </div>
      {/* You can use combinedDateTime for further processing */}
      <div>{combinedDateTime && combinedDateTime.toLocaleString()}</div>
    </LocalizationProvider>
  );
};

export default StaffDashboard;
