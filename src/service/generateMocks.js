'use strict';

const fs = require(`fs`);
const utils = require(`./utils`);
const constants = require(`./constants`);
const errors = require('./errorMessages');

const getPicture = (num) => `item${num < 10 ? `0${num}` : num}.jpg`;

const getNonRepeatingIndexesArray = (limit, maxArrayLength) => {
  const indexes = [];
  while (indexes.length <= limit) {
    let randomIndex;
    do {
      randomIndex = utils.getRandomArbitrary(0, maxArrayLength);
    } while (indexes.includes(randomIndex));
    indexes.push(randomIndex);
  }
  return indexes;
};

const generateArray = (limit, arr) => {
  const randomIndexes = getNonRepeatingIndexesArray(limit, arr.length);
  return randomIndexes.map(i => arr[i]);
};

const generate = (count = 1) => {
  if (count > constants.MAX_LIMIT) {
    return errors.generateMocksLimitExceeded();
  }

  const offers = [];
  for (let i = count; i > 0; i--) {
    const title = utils.getRandomFromArray(constants.TITLES);
    const picture = getPicture(Math.floor(Math.random() * 16));
    const description = generateArray(utils.getRandomArbitrary(1, 5), constants.DESCRIPTIONS).join(` `);
    const type = utils.getRandomFromArray(constants.OFFER_TYPES);
    const sum = utils.getRandomArbitrary(1000, 100000);
    const category = generateArray(utils.getRandomArbitrary(1, 6), constants.CATEGORIES);

    const offer = {
      title,
      picture,
      description,
      type,
      sum,
      category
    };
    offers.push(offer);
  }

  fs.writeFileSync(`mock.json`, JSON.stringify(offers, null, 4), function() {
    return 1;
  });
  return 0;
};

module.exports = {
  generate
};

