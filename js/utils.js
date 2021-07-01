const MAX_COMMENT_LENGTH = 140;
const ALERT_SHOW_TIME = 5000;

function checkСommentLength(comment, maxLength) {
  return comment.length <= maxLength;
}
checkСommentLength('textarea', MAX_COMMENT_LENGTH);

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// пример функции взят с https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
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
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// const successTemplate = document.querySelector('#success').content.querySelector('.success');
// const successMessage = document.createDocumentFragment();

// const showSuccessMessage = (message) => {
//   const successMessage = successTemplate.cloneNode(true);
//   successMessage.querySelector('.success__title').src = message.url;
//   successMessage.querySelector('.success__button').textContent = picture.comments.length;
//   successMessage.addEventListener('click', () => {
//     openPictureModal(picture);
//   });
//   similarPicturesFragment.appendChild(pictureElement);
// });

// otherUsersPicturesList.appendChild(similarPicturesFragment);
// };

export { checkСommentLength, getRandomNumber, isEscEvent, MAX_COMMENT_LENGTH, showAlert };
