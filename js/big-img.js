import { isEscEvent } from './utils.js';
const AVATAR_SIZE = 35;
const pictureOpenElement = document.querySelectorAll('.picture');
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureDescription = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentFragment = document.createDocumentFragment();
const pageBody = document.querySelector('body');

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePictureModal();
  }
};

const openPictureModal = (picture) => {
  bigPictureImg.scr = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;

  picture.comments.forEach(({ avatar, name, message }) => {
    const commentBlock = document.createElement('li');
    const commentPicture = document.createElement('img');
    const commentText = document.createElement('p');

    commentBlock.classList.add('social__comment');
    commentPicture.classList.add('social__picture');
    commentText.classList.add('social__text');
    commentPicture.src = avatar;
    commentPicture.alt = name;
    commentPicture.width = AVATAR_SIZE;
    commentPicture.height = AVATAR_SIZE;

    commentText.textContent = message;

    commentBlock.appendChild(commentPicture);
    commentBlock.appendChild(commentText);
    commentFragment.appendChild(commentBlock);
  });
  commentsList.appendChild(commentFragment);

  bigPicture.classList.remove('hidden');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  socialCommentCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  pageBody.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

pictureCloseElement.addEventListener('click', () => {
  closePictureModal();
});

export { pictureOpenElement, pictureCloseElement, openPictureModal };
