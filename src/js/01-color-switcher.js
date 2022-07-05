const startBtn = document.querySelector('[data-start]');
console.dir(startBtn);
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', changeColor);
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  body.style.backgroundColor = getRandomHexColor();
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
