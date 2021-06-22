import { MAX_COMMENT_LENGTH } from './utils.js';
import { pageBody } from './big-img.js';
import { onPopupEscKeydown } from './close-keydown.js';

const ERROE_TEXT_VALIDATE = `Хэштег начинается со знака "#" и включать в себя только буквы и цифры.
          Количетво символов после "#" более 19. Хэш-теги пишутся через пробел.`;
const ERROR_NO_REPEAT = 'Хэштеги не должны повторяться';
const MAX_HASHTAGS_COUNT = 5;
const userModalElement = document.querySelector('.img-upload__overlay');
const userModalOpenElement = document.querySelector('#upload-file');
const userModalCloseElement = userModalElement.querySelector('#upload-cancel');
const userHashtags = document.querySelector('.text__hashtags');
const userDescription = document.querySelector('.text__description');
const hashtagReg = /^#[A-Za-zА-ЯЁёа-я0-9]{1,19}$/;

const openUserModal = () => {
  userModalElement.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  userModalElement.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalOpenElement.addEventListener('click', openUserModal);

userModalCloseElement.addEventListener('click', closeUserModal);

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

const validationFormHashtag = (evt) => {

  if (userHashtags.value !== '') {
    const hashtags = userHashtags.value.toLowerCase().trim().split(' ');

    hashtags.forEach((hashtag, i) => {
      if (!hashtagReg.test(hashtag)) {
        userHashtags.classList.add('text__invalid');
        userHashtags.setCustomValidity(ERROE_TEXT_VALIDATE);
        evt.preventDefault();
      } else if (hashtags.indexOf(hashtag) !== i) {
        userHashtags.classList.add('text__invalid');
        userHashtags.setCustomValidity(ERROR_NO_REPEAT);
        evt.preventDefault();
      } else {
        userHashtags.classList.remove('text__invalid');
        userHashtags.setCustomValidity('');
      }
      userHashtags.reportValidity();
    });
    if (hashtags.length > MAX_HASHTAGS_COUNT) {
      userHashtags.setCustomValidity(`Количество хэштегов должно быть не более ${MAX_HASHTAGS_COUNT}`);
    }
  } else {
    userHashtags.classList.remove('text__invalid');
    userHashtags.setCustomValidity('');
  }
};

userHashtags.addEventListener('input', validationFormHashtag);

export { closeUserModal };
