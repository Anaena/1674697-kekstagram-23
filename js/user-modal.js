import { onPopupEscKeydown } from './close-keydown.js';
import { onScale, offScale } from './scale-control.js';
import { onEffects, offEffects } from './slider-effect-level.js';
import { userHashtags, userDescription, userForm } from './user-form.js';

const userModalOpenElement = document.querySelector('#upload-file');
const userModalCloseElement = document.querySelector('#upload-cancel');
const userModalElement = document.querySelector('.img-upload__overlay');

const openModalElements = () => {
  userModalElement.classList.remove('hidden');
  onScale();
  onEffects();
};

const closeModalElements = () => {
  userModalElement.classList.add('hidden');
  offScale();
  offEffects();
};

const openUserModal = () => {
  openModalElements();
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  closeModalElements();
  userDescription.value = '';
  userHashtags.value = '';
  userForm.reset();
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

userModalOpenElement.addEventListener('click', openUserModal);

userModalCloseElement.addEventListener('click', closeUserModal);

export { openUserModal, closeUserModal, userModalElement, openModalElements, closeModalElements };
