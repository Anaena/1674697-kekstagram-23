import { onPopupEscKeydown } from './close-keydown.js';
import { setScale, CURRENT_CONTROL_VALUE } from './scale-control.js';
import { userHashtags, userDescription } from './user-form.js';

const userModalOpenElement = document.querySelector('#upload-file');
const userModalCloseElement = document.querySelector('#upload-cancel');
const userModalElement = document.querySelector('.img-upload__overlay');

const openUserModal = () => {
  userModalElement.classList.remove('hidden');
  setScale(CURRENT_CONTROL_VALUE);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  userDescription.value = '';
  userHashtags.value = '';
  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalOpenElement.addEventListener('click', openUserModal);

userModalCloseElement.addEventListener('click', closeUserModal);

export { openUserModal, closeUserModal, userModalElement };
