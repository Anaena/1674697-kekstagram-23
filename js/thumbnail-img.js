import { createPhoto } from './data.js';

const otherUsersPicturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarPictures = createPhoto();

const similarPicturesFragment = document.createDocumentFragment();

similarPictures.forEach(({url, comments, likes}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarPicturesFragment.appendChild(pictureElement);
});

otherUsersPicturesList.appendChild(similarPicturesFragment);

export {similarPictures, similarPicturesFragment};
