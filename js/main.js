import './big-img.js';
import './scale-control.js';
import './slider-effect-level.js';
import './user-form.js';
import './api.js';
import { renderPictures } from './thumbnail-img.js';
import { setUserFormSubmit } from './user-form.js';
import { closeUserModal } from './user-modal.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';

const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise
  .then(renderPictures);
// dataPromise.then(someFunctionUsingPicturesData);

setUserFormSubmit(closeUserModal);
