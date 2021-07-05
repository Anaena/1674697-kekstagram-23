const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 5000;

function checkСommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}
checkСommentLength('textarea', MAX_COMMENT_LENGTH);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Функция для случайного числа
// Источник https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
getRandomNumber(0, 10);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '30px 10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Перемешивание массива
// Источник - https://learn.javascript.ru/task/sort-by-field

const shuffle = (arrays) => {
  for (let i = arrays.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [arrays[i], arrays[j]] = [arrays[j], arrays[i]];
  }
  return arrays;
};

export { checkСommentLength, getRandomNumber, isEscEvent, MAX_COMMENT_LENGTH, showAlert, debounce, shuffle };
