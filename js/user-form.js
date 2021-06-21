import { onPopupEscKeydown, pageBody } from './big-img.js';
import { MAX_COMMENT_LENGTH } from './utils.js';

const userModalElement = document.querySelector('.img-upload__overlay');
const userModalOpenElement = document.querySelector('#upload-file');
const userModalCloseElement = userModalElement.querySelector('#upload-cancel');
const userHashtagsInput = document.querySelector('.text__hashtags');
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

userModalOpenElement.addEventListener('click', () => {
  openUserModal();
});

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

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


userHashtagsInput.addEventListener('input', () => {
  const hashtags = userHashtagsInput.split(' ');

  if (hashtags.length > 5) {
    hashtags.classList.add('text__invalid');
    hashtags.setCustomValidity('Указано больше 5 хэш-тегов');
  }

  const uniqueHashTags = [];
  for (let i = 0; i < hashtags.length; i++) {
    if (!hashtags[i].match(hashtagReg)) {
      userHashtagsInput.classList.add('text__invalid');
      userHashtagsInput.setCustomValidity(`Хэш-тег ${hashtags[i]} не прошёл регулярку`);
    } else if (uniqueHashTags.includes(hashtags[i].toLowerCase())) {
      userHashtagsInput.classList.add('text__invalid');
      userHashtagsInput.setCustomValidity(`Хэш-тег ${hashtags[i]} встретился больше одного раза`);
    } else {
      userHashtagsInput.classList.remove('text__invalid');
      userHashtagsInput.setCustomValidity('');
    }
    userHashtagsInput.reportValidity();
  }
});

export { closeUserModal };
