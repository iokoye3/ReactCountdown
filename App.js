import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './App.css';

const Countdown = () => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState('00:00');
  const [countdown, setCountdown] = useState({
    years: undefined, months: undefined, days: undefined, hours: undefined, minutes: undefined, seconds: undefined
  });
  const [countdownInterval, setCountdownInterval] = useState(null);
  const pastDate = countdown.seconds === 0 && countdown.minutes === 0 && countdown.hours === 0 && countdown.days === 0 && countdown.months === 0 && countdown.years === 0;
  
  const countdownTimer = () => {
    const countdownTime = new Date(`${date.toDateString()} ${time}`).getTime();
    const currentTime = new Date().getTime();
    const timeRemaining = countdownTime - currentTime;

    if (timeRemaining > 0) {
      const years = Math.floor(timeRemaining / (1000 * 60 * 60 * 24 * 365 ));
      const months = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((timeRemaining % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

      setCountdown({
        years, months, days, hours, minutes, seconds
      });
    } 
    else {
      setCountdown({
        years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0,
      });
      clearInterval(countdownInterval);
    }
  };

  const handleChange = (selectedDate) => {
    setDate(selectedDate);
    setCountdown('');
    clearInterval(countdownInterval);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
    setCountdown('');
    clearInterval(countdownInterval);
  };

  const handleCountdown = () => {
    clearInterval(countdownInterval);
    countdownTimer();
    const interval = setInterval(countdownTimer, 1000);
    setCountdownInterval(interval);
  };

  return (
    <div className='main'>
      <DatePicker className='select' selected={date} onChange={handleChange} />
      <input className='current' type="time" value={time} onChange={handleTime} />
      <button className='start' onClick={handleCountdown}>Start Countdown</button>
      {countdown.years !== 0 && countdown.years !== undefined && (
        <p>{countdown.years} years</p>
      )}
      {countdown.months !== 0 && countdown.months !== undefined && (
        <p>{countdown.months} months</p>
      )}
      {countdown.days !== 0 && countdown.days !== undefined && (
        <p>{countdown.days} days</p>
      )}
      {countdown.hours !== 0 && countdown.hours !== undefined && (
        <p>{countdown.hours} hours</p>
      )}
      {countdown.minutes !== 0 && countdown.minutes !== undefined && (
        <p>{countdown.minutes} minutes</p>
      )}
      {countdown.seconds !== 0 && countdown.seconds !== undefined && (
        <p>{countdown.seconds} seconds</p>
      )}
      {pastDate && (
        <p>Date and time has passed.</p>
      )}
    </div>
  )
}
export default Countdown;
