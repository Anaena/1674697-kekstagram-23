import { closePictureModal } from './big-img.js';
import { closeUserModal } from './user-modal.js';
import { userHashtags, userDescription } from './user-form.js';
import { hideModalMessage} from './modal-messages.js';
import { isEscEvent } from './utils.js';

const userModalOpenElement = document.querySelector('#upload-file');
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

const onMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideModalMessage();
  }
};

export { onPopupEscKeydown, onMessageKeydown };
