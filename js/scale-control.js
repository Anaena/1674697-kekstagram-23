import { picturePreview } from './upload-picture.js';

const CURRENT_CONTROL_VALUE = 100;
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleDownControl = document.querySelector('.scale__control--smaller');
const scaleUpControl = document.querySelector('.scale__control--bigger');

const scaleDirection = {
  up: 1,
  down: -1,
};

const scaleThreshold = {
  max: 100,
  min: 25,
};

const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  picturePreview.style.transform = `scale(${value / 100})`;
};

const changeScale = (direction) => {
  const scale = Number(scaleControlValue.value.replace(/[^\d]/g, ''));
  if (scale >= scaleThreshold.max && direction === scaleDirection.up
   || scale <= scaleThreshold.min && direction === scaleDirection.down) {
    return;
  }
  setScale(scale  + 25 * direction);
};

scaleUpControl.addEventListener('click', () => changeScale(scaleDirection.up));
scaleDownControl.addEventListener('click', () => changeScale(scaleDirection.down));

export { picturePreview, setScale, CURRENT_CONTROL_VALUE };
