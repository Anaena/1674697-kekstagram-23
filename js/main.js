import { getRandomNumber } from './utils.js';
import { createComment, DESCRIPTION } from './data.js';

const SIMILAR_DESCRIPTION_NUMBER = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;

const similarComments = new Array(SIMILAR_DESCRIPTION_NUMBER).fill(null).map(createComment);

const createPhoto = () => {
  const descriptions = [];
  for (let id = 1; id <= SIMILAR_DESCRIPTION_NUMBER; id++) {
    descriptions.push({
      id: id,
      url: `photos/${id}.jpg`,
      description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: similarComments[getRandomNumber(0, similarComments.length - 1)],
    });
  }
  return descriptions;
};

createPhoto();
