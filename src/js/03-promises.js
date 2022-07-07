import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');
const inputDelay = formEl.elements.delay;
const inputStep = formEl.elements.step;
const inputAmount = formEl.elements.amount;

formEl.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}

function onFormSubmit(evt) {
  evt.preventDefault();
  let delay = inputDelay.value;
  let step = inputStep.value;
  for (let position = 1; position <= inputAmount.value; position += 1) {
    createPromise(position, delay - step + step * position)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
}
