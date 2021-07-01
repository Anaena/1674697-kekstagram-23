import { MAX_COMMENT_LENGTH } from './utils.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './modal-messages.js';
import { userModalElement } from './user-modal.js';

const ERROE_TEXT_VALIDATE = `Хэштег начинается со знака "#" и включать в себя только буквы и цифры.
          Количетво символов после "#" более 19. Хэш-теги пишутся через пробел.`;
const ERROR_NO_REPEAT = 'Хэштеги не должны повторяться';
const MAX_HASHTAGS_COUNT = 5;
const userForm = document.querySelector('.img-upload__form');
const userHashtags = userForm.querySelector('.text__hashtags');
const userDescription = userForm.querySelector('.text__description');
const hashtagReg = /^#[A-Za-zА-ЯЁёа-я0-9]{1,19}$/;


userDescription.addEventListener('input', () => {
  const valueLength = userDescription.value.length;

  if (valueLength > MAX_COMMENT_LENGTH) {
    userDescription.classList.add('text__invalid');
    userDescription.setCustomValidity(`Удалите лишние ${valueLength - MAX_COMMENT_LENGTH} симв.`);
  } else {
    userDescription.classList.remove('text__invalid');
    userDescription.setCustomValidity('');
  }
  userDescription.reportValidity();
});

const setElementError = (element, errorMessage) => {
  if (errorMessage) {
    element.classList.add('text__invalid');
  } else {
    element.classList.remove('text__invalid');
  }
  element.setCustomValidity(errorMessage);
};

const validationFormHashtag = (evt) => {
  const hashtagsValue = userHashtags.value.toLowerCase().trim();
  if (hashtagsValue !== '') {
    const hashtags = hashtagsValue.split(' ');

    hashtags.forEach((hashtag, i) => {
      if (!hashtagReg.test(hashtag)) {
        setElementError(userHashtags, ERROE_TEXT_VALIDATE);
        evt.preventDefault();
      } else if (hashtags.indexOf(hashtag) !== i) {
        setElementError(userHashtags, ERROR_NO_REPEAT);
        evt.preventDefault();
      } else {
        userHashtags.classList.remove('text__invalid');
        userHashtags.setCustomValidity('');
      }
      userHashtags.reportValidity();
    });
    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      setElementError(userHashtags, `Количество хэштегов должно быть не более ${MAX_HASHTAGS_COUNT}`);
    }
  } else {
    userHashtags.classList.remove('text__invalid');
    userHashtags.setCustomValidity('');
  }
};

userHashtags.addEventListener('input', validationFormHashtag);

const setUserFormSubmit = () => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    userModalElement.classList.add('hidden');
    sendData(
      () => showSuccessMessage(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

export { userForm, setUserFormSubmit, userHashtags, userDescription };
