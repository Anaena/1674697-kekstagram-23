import { renderPictures } from './thumbnail-img.js';
import { shuffle } from './utils.js';

const NUMBER_RANDOM_PICTURES = 10;
// const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const picturesList = document.querySelector('.pictures');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const setFiltersActive = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const clearPhotos = () => {
  const pictures = picturesList.querySelectorAll('.picture');

  pictures.forEach((picture) => {
    picture.remove();
  });
};

const getDefaultPictures = (pictures) => {
  const defaultPictures = pictures.sort((a, b) => a.id > b.id ? 1 : -1);
  return defaultPictures;
};

const getRandomPictures = (pictures) => {
  const randomPictures = shuffle(pictures).slice(0, NUMBER_RANDOM_PICTURES);
  return randomPictures;
};

const getDiscussedPictures = (pictures) => {
  const discussedPictures = pictures.sort((a, b) => a.comments.length > b.comments.length ? 1 : -1);
  return discussedPictures.reverse();
};

const changeFilters = (pictures) => {
  clearPhotos();
  filterDefault.addEventListener('click', () => {
    setFiltersActive(filterDefault);
    renderPictures(getDefaultPictures(pictures));
  });

  filterRandom.addEventListener('click', () => {
    setFiltersActive(filterRandom);
    renderPictures(getRandomPictures(pictures));
  });

  filterDiscussed.addEventListener('click', () => {
    setFiltersActive(filterDiscussed);
    renderPictures(getDiscussedPictures(pictures));
  });
};

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
};

export { showFilters, changeFilters };
