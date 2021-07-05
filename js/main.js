import './api.js';
import './big-img.js';
import './filters.js';
import './scale-control.js';
import './slider-effect-level.js';
import './upload-picture.js';
import './user-form.js';
import { getData } from './api.js';
import { showFilters, changeFilters } from './filters.js';
import { renderPictures } from './thumbnail-img.js';
import { setUserFormSubmit } from './user-form.js';
import { onUserModalClose } from './user-modal.js';
import { showAlert } from './utils.js';

const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise
  .then((data) => {
    renderPictures(data);
    showFilters();
    changeFilters(data);
  });

setUserFormSubmit(onUserModalClose);

export { dataPromise };
