import './big-img.js';
import './scale-control.js';
import './slider-effect-level.js';
import { renderPictures } from './thumbnail-img.js';
import { setUserFormSubmit } from './user-form.js';
import { closeUserModal } from './user-modal.js';
import { showAlert } from './utils.js';
import { getData } from './api.js';

getData((pictures) => {
  renderPictures(pictures);
  () => showAlert('Не удалось получить данные с сервера, произошла ошибка запроса. Попробуйте ещё раз.');
});

setUserFormSubmit(closeUserModal);
