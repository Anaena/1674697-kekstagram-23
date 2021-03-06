import { openPictureModal } from './big-img.js';

const otherUsersPicturesList = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();

const renderPictures = (pictures) => {
  pictures.forEach((picture) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.addEventListener('click', () => {
      openPictureModal(picture);
    });
    similarPicturesFragment.appendChild(pictureElement);
  });

  otherUsersPicturesList.appendChild(similarPicturesFragment);
};

export { similarPicturesFragment, renderPictures, otherUsersPicturesList };
