import { onPictureModalClose } from './big-img.js';
import { onUserModalClose } from './user-modal.js';
import { userHashtags, userDescription, userForm } from './user-form.js';
import { onModalMessageHide} from './modal-messages.js';
import { isEscEvent } from './utils.js';

const userModalOpenElement = document.querySelector('#upload-file');
const userCommentInput = document.querySelector('.social__footer-text');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    if (userDescription === document.activeElement || userHashtags === document.activeElement) {
      evt.stopPropagation();
    } else {
      onPictureModalClose();
      onUserModalClose();
      userForm.reset();
      userCommentInput.value = '';
      userModalOpenElement.value = '';
    }
  }
};

const onMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onModalMessageHide();
  }
};

export { onPopupEscKeydown, onMessageKeydown };
