const MAX_COMMENT_LENGTH = 140;

function checkСommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}

checkСommentLength('textarea', MAX_COMMENT_LENGTH);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const isEnterEvent = (evt) => evt.key === 'Enter';

// пример функции взят с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

getRandomNumber(0, 10);

export {checkСommentLength, getRandomNumber, isEscEvent, isEnterEvent};
