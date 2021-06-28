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

let currentComments = [];
let hiddenComments = [];
let lastShownComment = 0;

const renderComments = (commentList, { avatar, name, message }) => {
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
  commentList.appendChild(commentBlock);
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
  let shownComment = 0;
  let lastShownComment = shownComment + COMMENTS_STEP;
  const countLength = picture.comments.length;
  const pictureComment = picture.comments;
  const slicedComment = pictureComment.slice(shownComment, lastShownComment);
  pictureComment.slice(shownComment, lastShownComment).forEach((comment) => renderComments(commentsList, comment));
  commentsLoaderButton.addEventListener('click', () => {
    shownComment += COMMENTS_STEP;
    lastShownComment += COMMENTS_STEP;
    slicedComment.forEach((comment) => renderComments(commentsList, comment));
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
