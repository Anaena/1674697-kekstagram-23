import { onPopupEscKeydown } from './close-keydown.js';
import { setScale, CURRENT_CONTROL_VALUE } from './scale-control.js';
import { onEffects, offEffects } from './slider-effect-level.js';
import { userHashtags, userDescription, userForm } from './user-form.js';

const userModalOpenElement = document.querySelector('#upload-file');
const userModalCloseElement = document.querySelector('#upload-cancel');
const userModalElement = document.querySelector('.img-upload__overlay');

const openModalElements = () => {
  userModalElement.classList.remove('hidden');
  onEffects();
};

const closeModalElements = () => {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  offEffects();
};

const onUserModalOpen = () => {
  openModalElements();
  setScale(CURRENT_CONTROL_VALUE);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const onUserModalClose = () => {
  closeModalElements();
  userDescription.value = '';
  userHashtags.value = '';
  userForm.reset();
  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalOpenElement.addEventListener('change', onUserModalOpen);

userModalCloseElement.addEventListener('click', onUserModalClose);

export { onUserModalOpen, onUserModalClose, userModalElement, openModalElements, closeModalElements };
