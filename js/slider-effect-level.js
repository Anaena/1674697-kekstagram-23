import { picturePreview } from './scale-control.js';

const NONE_EFFECT = 'none';
const form = document.querySelector('.img-upload__form');
const sliderElement = form.querySelector('.effect-level__slider');
const sliderValue = form.querySelector('.effect-level__value');
let currentEffect;

const effectNames = {
  chrome: {
    filterName: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  sepia: {
    filterName: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
      connect: 'lower',
    },
  },
  marvin: {
    filterName: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
      connect: 'lower',
    },
  },
  phobos: {
    filterName: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
  heat: {
    filterName: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
      connect: 'lower',
    },
  },
};

const turnEffectLevel = (effectName) => {
  const {
    options,
    filterName,
    unit,
  } = effectNames[effectName];

  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.off();
    sliderElement.noUiSlider.updateOptions(options);
  } else {
    noUiSlider.create(sliderElement, options);
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
