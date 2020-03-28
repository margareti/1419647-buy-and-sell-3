'use strict';

const getRandomFromArray = (arr) => {
  const maxLength = arr.length;
  const randomIndex = getRandomArbitrary(0, maxLength);
  return arr[randomIndex];
};

const getRandomArbitrary = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = {
  getRandomFromArray,
  getRandomArbitrary
};