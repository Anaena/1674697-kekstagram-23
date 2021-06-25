import { closePictureModal } from './big-img.js';
import { closeUserModal } from './user-form.js';
import { isEscEvent } from './utils.js';

const userModalOpenElement = document.querySelector('#upload-file');
const userHashtags = document.querySelector('.text__hashtags');
const userDescription = document.querySelector('.text__description');
const userCommentInput = document.querySelector('.social__footer-text');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (userDescription === document.activeElement || userHashtags === document.activeElement) {
      evt.stopPropagation();
    } else {
      closePictureModal();
      closeUserModal();
      userCommentInput.value = '';
      userModalOpenElement.value = '';
    }
  }
};

export { onPopupEscKeydown };
