import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let pickedDate = null;
startBtn.addEventListener('click', startTimer);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - Date.now() < 0) {
      startBtn.disabled = true;
      alert('Please choose a date in the future');
      return;
    }
    pickedDate = selectedDates[0];
    input.disabled = true;
    startBtn.disabled = false;
  },
};

function startTimer() {
  startBtn.disabled = true;
  const interval = setInterval(() => {
    const dif = pickedDate - Date.now();
    const { days, hours, minutes, seconds } = convertMs(dif);
    if (dif < 1000) {
      clearInterval(interval);
    }
    daysValue.textContent = days;
    hoursValue.textContent = hours;
    minutesValue.textContent = minutes;
    secondsValue.textContent = seconds;
  }, 1000);
}

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
