const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');

const hideModalMessage = (message) => {
  message.remove();
};

const showSuccessMessage = () => {
  const successMessage = successTemplate.cloneNode(true);
  const successMessageBox = successMessage.querySelector('.success__inner');
  const successButton = successMessage.querySelector('.success__button');
  successButton.addEventListener('click', hideModalMessage(successMessage));
  successMessageBox.addEventListener('click');

  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  const errorMessage = errorTemplate.cloneNode(true);
  const errorMessageBox = errorMessage.querySelector('.success__inner');
  const errorButton = errorMessage.querySelector('.success__button');
  errorButton.addEventListener('click', hideModalMessage(errorMessage));
  errorMessageBox.addEventListener('click');

  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
