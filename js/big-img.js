import { onPopupEscKeydown } from './close-keydown.js';

const AVATAR_SIZE = 35;
const COMMENTS_STEP = 5;
const pictureCloseElement = document.querySelector('.big-picture__cancel');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const pictureDescription = bigPicture.querySelector('.social__caption');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsList = bigPicture.querySelector('.social__comments');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoaderButton = bigPicture.querySelector('.comments-loader');

let currentComments = [];

const renderComment = ({ avatar, name, message }) => {
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
  commentsList.appendChild(commentBlock);
};

const renderComments = (comments) => comments.forEach(renderComment);
const renderMoreComments = () => {
  const displayedCommentsCount = commentsList.querySelectorAll('.social__comment').length;
  renderComments(currentComments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP));
  const numberComments = commentsList.querySelectorAll('.social__comment').length;
  if (numberComments === currentComments.length) {
    commentsLoaderButton.classList.add('hidden');
  } else {
    commentsLoaderButton.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = `${numberComments} из <span class="comments-count">${currentComments.length}</span> комментариев`;
};

const openPictureModal = (picture) => {
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;
  commentsList.innerHTML = '';
  currentComments = picture.comments;
  renderMoreComments(picture.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const onPictureModalClose = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

pictureCloseElement.addEventListener('click', onPictureModalClose);

commentsLoaderButton.addEventListener('click', renderMoreComments);

export { pictureCloseElement, openPictureModal, onPictureModalClose, renderMoreComments };
