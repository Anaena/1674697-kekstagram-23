const MAX_COMMENT_LENGTH = 140;

// пример функции взят с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomNumber(min, max) {
  if (min >= 0 && min < max) {
    min = Math.floor(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return 'Что-то пошло не так!';
}

getRandomNumber(1, 5);

function checkСommentLength(comment, maxLength) {
  if (comment.length <= maxLength) {
    return true;
  }
  return false;
}

checkСommentLength('textarea', MAX_COMMENT_LENGTH);
