import throttle from 'lodash.throttle';

const emailEl = document.querySelector('.feedback-form');
const messageEl = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';

const userData = {};

emailEl.addEventListener('submit', onFormSubmit);
messageEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onFormSubmit(e) {
  e.preventDefault();

  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextareaInput(e) {
  const message = e.target.value;

  localStorage.setItem(STORAGE_KEY, message);
}

function populateTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);

  if (savedMessage) {
    console.log(savedMessage);
    messageEl.value = savedMessage;
  }
}
