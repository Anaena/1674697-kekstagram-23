import { renderPictures } from './thumbnail-img.js';
import { shuffle } from './utils.js';

const NUMBER_RANDOM_PICTURES = 10;
// const RERENDER_DELAY = 500;

const imgFilters = document.querySelector('.img-filters');
const filterButtons = imgFilters.querySelectorAll('.img-filters__button');
// const filtersForm = document.querySelector('.img-filters__form');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

const setFiltersActive = (activeButton) => {
  filterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
};

const getDefaultPictures = (pictures) => {
  pictures.sort((a, b) => a.id > b.id ? 1 : -1);
};

const getRandomPictures = (pictures) => {
  shuffle(pictures).slice(0, NUMBER_RANDOM_PICTURES);
};

const getDiscussedPictures = (pictures) => {
  pictures.sort((a, b) => a.comments.length > b.comments.length ? 1 : -1);
  pictures = pictures.reverse();
};

// const clearPhotos = () => {};

const changeFilters = () => {
  filterDefault.addEventListener('click', () => {
    setFiltersActive(filterDefault);
    renderPictures(getDefaultPictures);
  });

  filterRandom.addEventListener('click', () => {
    setFiltersActive(filterRandom);
    renderPictures(getRandomPictures);
  });

  filterDiscussed.addEventListener('click', () => {
    setFiltersActive(filterDiscussed);
    renderPictures(getDiscussedPictures);
  });
};

const showFilters = () => {
  imgFilters.classList.remove('img-filters--inactive');
  changeFilters();
};

export { showFilters };
