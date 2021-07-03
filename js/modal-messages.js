import { onMessageKeydown } from './close-keydown.js';
import { userForm } from './user-form.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const hideModalMessage = () => {
  document.querySelectorAll('.success, .error').forEach((messageElement) => messageElement.remove());
  userForm.reset();
  document.removeEventListener('click', hideModalMessage);
  document.removeEventListener('keydown', onMessageKeydown);
};

const onMessageAreaClick = (evt) => {
  evt.stopPropagation();
};

const showModalMessage = () => {
  document.addEventListener('click', hideModalMessage);
  document.addEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successMessageBox = successMessage.querySelector('.success__inner');
  const successButton = successMessage.querySelector('.success__button');
  showModalMessage();
  successButton.addEventListener('click', hideModalMessage);
  successMessageBox.addEventListener('click', onMessageAreaClick);

  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorMessageBox = errorMessage.querySelector('.error__inner');
  const errorButton = errorMessage.querySelector('.error__button');
  showModalMessage();
  errorButton.addEventListener('click', hideModalMessage);
  errorMessageBox.addEventListener('click', onMessageAreaClick);

  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage, hideModalMessage };
