import { picturePreview } from './scale-control.js';

const NONE_EFFECT = 'none';
const form = document.querySelector('.img-upload__form');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');
let currentEffect;

const effectNames = {
  chrome: {
    name: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
  },
  marvin: {
    name: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    name: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    name: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
  },
};

const turnEffectLevel = (effectName) => {
  const {
    min,
    max,
    step,
    name: filterName,
    unit = '',
  } = effectNames[effectName];

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.updateOptions({
      range: {
        min,
        max,
      },
      start: max,
      step,
    });
  } else {
    noUiSlider.create(sliderElement, {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
      format: {
        to: (value) => {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => parseFloat(value),
      },
    });
  }

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    const value = unencoded[handle];
    sliderValue.value = value;
    picturePreview.style.filter = `${filterName}(${value}${unit})`;
  });

};

const destroyEffectLevel = () => {
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.destroy();
  }
  sliderValue.value = '';
  picturePreview.style.filter = '';
};

const filterChangeHandler = (evt) => {
  currentEffect = evt.target.value;
  if (evt.target.matches('.effects__radio')) {
    picturePreview.classList = `img-upload__preview effects__preview--${evt.target.value}`;
    if (currentEffect === NONE_EFFECT) {
      destroyEffectLevel();
    } else {
      turnEffectLevel(currentEffect);
    }
  }
};

form.addEventListener('change', filterChangeHandler);
