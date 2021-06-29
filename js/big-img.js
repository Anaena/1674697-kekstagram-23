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
const pageBody = document.querySelector('body');

const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

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
const renderMoreComments = (comments) => {
  const displayedCommentsCount = commentsList.querySelectorAll('.social__comment').length;
  renderComments(comments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP));
  const numberComments = commentsList.querySelectorAll('.social__comment').length;
  if (numberComments === comments.length) {
    commentsLoaderButton.classList.add('hidden');
    socialCommentCount.classList.add('hidden');
  } else {
    socialCommentCount.classList.remove('hidden');
    commentsLoaderButton.classList.remove('hidden');
  }
  socialCommentCount.innerHTML = `${numberComments} из <span class="comments-count">${comments.length}</span> комментариев`;
};

const openPictureModal = (picture) => {
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;
  commentsList.innerHTML = '';
  renderMoreComments(picture.comments);
  commentsLoaderButton.addEventListener('click', () => {
    renderMoreComments(picture.comments);
  });
  pictureCloseElement.addEventListener('click', () => {
    closePictureModal();
    commentsList.innerHTML = '';
    picture.comments = '';
  });
  bigPicture.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

// pictureCloseElement.addEventListener('click', (comments) => {
//   closePictureModal();
//   commentsList.innerHTML = '';
//   // comments = '';
// });

export { pictureCloseElement, openPictureModal, closePictureModal, pageBody };
