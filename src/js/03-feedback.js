import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const input = document.querySelector('.feedback-form input');
const textarea = document.querySelector('.feedback-form textarea');

const STORAGE_KEY = 'feedback-form-state';

const userData = {};

function userDataStorage(e) {
  userData.message = emailEl.elements.message.value;
  userData.email = emailEl.elements.email.value;
}

formEl.addEventListener('submit', onFormSubmit);
formEl.addEventListener('input', throttle(onTextareaInput, 500));

populateTextarea();

function onTextareaInput(e) {
  userData[e.target.name] = e.target.value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
}

function onFormSubmit(e) {
  e.preventDefault();

  const submitData = localStorage.getItem(STORAGE_KEY);
  const parsedData = JSON.parse(submitData);
  if (parsedData) {
    console.log(parsedData);
  }
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function populateTextarea() {
  if (localStorage.getItem(STORAGE_KEY)) {
    const savedMessage = localStorage.getItem(STORAGE_KEY);
    userData = JSON.parse(savedMessage);
  }
  if (userData.email) {
    input.value = userData.email;
  }
  if (userData.message) {
    textarea.value = userData.message;
  }
}
