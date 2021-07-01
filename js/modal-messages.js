import { onMessageKeydown } from './close-keydown.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

let successMessage = undefined;
let errorMessage = undefined;

const hideModalMessage = () => {
  successMessage.remove();
  errorMessage.remove();
  document.removeEventListener('keydown', onMessageKeydown);
};

const onMessageAreaClick = (evt) => {
  evt.stopPropagation();
};

const showModalMessage = () => {
  document.addEventListener('click', () => {
    hideModalMessage();
  });
  document.addEventListener('keydown', onMessageKeydown);
};


const showSuccessMessage = () => {
  successMessage = successTemplate.cloneNode(true);
  const successMessageBox = successMessage.querySelector('.success__inner');
  const successButton = successMessage.querySelector('.success__button');
  showModalMessage();
  successButton.addEventListener('click', () => {
    hideModalMessage();
  });
  successMessageBox.addEventListener('click', () => {
    onMessageAreaClick();
  });

  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  errorMessage = errorTemplate.cloneNode(true);
  const errorMessageBox = errorMessage.querySelector('.error__inner');
  const errorButton = errorMessage.querySelector('.error__button');
  showModalMessage(errorMessage);
  errorButton.addEventListener('click', () => {
    hideModalMessage(errorMessage);
  });
  errorMessageBox.addEventListener('click', () => {
    onMessageAreaClick();
  });

  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage, hideModalMessage };
