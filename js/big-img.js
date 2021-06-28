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

let lastShownComment = 0;

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

const getNextComments = () => {
  const comments = commentsList.children;
  const commentsCountLength = comments.length;
  let nextComment = COMMENTS_STEP;
  if (commentsCountLength > lastShownComment + COMMENTS_STEP) {
    nextComment = lastShownComment + COMMENTS_STEP;
  } else {
    nextComment = commentsCountLength;
  }
  commentsLoaderButton.classList.toggle('hidden', commentsCountLength === nextComment);
  socialCommentCount.firstChild.textContent = `${nextComment} из `;
  lastShownComment = nextComment;
};

const openPictureModal = (picture) => {
  bigPictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  pictureDescription.textContent = picture.description;
  commentsList.innerHTML = '';
  const renderComments = (comments) => comments.forEach(renderComment);
  const renderMoreComments = (comments) => {
    const displayedCommentsCount = commentsList.querySelectorAll('.social__comment').length;
    renderComments(comments.slice(displayedCommentsCount, displayedCommentsCount + COMMENTS_STEP));
  };
  renderMoreComments(picture.comments);
  commentsLoaderButton.addEventListener('click', () => {
    renderMoreComments(picture.comments);
    getNextComments();
  });
  bigPicture.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
};

const closePictureModal = () => {
  bigPicture.classList.add('hidden');
  pageBody.classList.remove('modal-open');
  commentsLoaderButton.removeEventListener('click', getNextComments);

  document.removeEventListener('keydown', onPopupEscKeydown);
};

pictureCloseElement.addEventListener('click', () => {
  closePictureModal();
});

export { pictureCloseElement, openPictureModal, closePictureModal, pageBody };
