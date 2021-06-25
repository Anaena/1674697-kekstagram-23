const MAX_CONTROL_VALUE = 100;
const MIN_CONTROL_VALUE = 25;
const CARRENT_CONTROL_VALUE = 100;
const scaleControlValue = document.querySelector('.scale__control--value');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const picturePreview = document.querySelector('.img-upload__preview');


const setScale = (value) => {
  scaleControlValue.value = `${value}%`;
  picturePreview.style.transform = `scale(${value / 100})`;
};

const calculateScale = (value, button) => {
  let newValue = Number(value.replace('%', ''));
  if (button === 'up') {
    newValue += 25;
  }
  if (button === 'down') {
    newValue -= 25;
  }
  if (newValue > MAX_CONTROL_VALUE) {
    newValue = MAX_CONTROL_VALUE;
  }
  if (newValue < MIN_CONTROL_VALUE) {
    newValue = MIN_CONTROL_VALUE;
  }
  setScale(newValue);
};

scaleControlBigger.addEventListener('click', () => {
  calculateScale(scaleControlValue.value, 'up');
});

scaleControlSmaller.addEventListener('click', () => {
  calculateScale(scaleControlValue.value, 'down');
});

export { picturePreview, setScale, CARRENT_CONTROL_VALUE };
