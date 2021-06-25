import { picturePreview } from './scale-control.js';

const NONE_EFFECT = 'img-upload__preview effects__preview--none';
const form = document.querySelector('.img-upload__form');
// const sliderElement = form.querySelector('.effect-level__slider');
// const sliderValue = form.querySelector('.effect-level__value');

const filterChangeHandler = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    picturePreview.classList = `img-upload__preview effects__preview--${evt.target.value}`;
  } else {
    picturePreview.classList = NONE_EFFECT;
  }
};

form.addEventListener('change', filterChangeHandler);
