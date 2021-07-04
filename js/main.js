import './api.js';
import './big-img.js';
import './filters.js';
import './scale-control.js';
import './slider-effect-level.js';
import './user-form.js';
import { getData } from './api.js';
import { showFilters } from './filters.js';
import { renderPictures } from './thumbnail-img.js';
import { setUserFormSubmit } from './user-form.js';
import { closeUserModal } from './user-modal.js';
import { showAlert } from './utils.js';

const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise
  .then((data) => {
    renderPictures(data);
    showFilters();
  });

setUserFormSubmit(closeUserModal);

export { dataPromise };
