'use strict';

const fs = require(`fs`);
const utils = require(`./utils`);
const constants = require('./constants');

const getPicture = (num) => `item${num < 10 ? `0${num}` : num}.jpg`;

const getNonRepeatingIndex = (sourceArray, historyArray) => {
  let randomIndex;
  do {
    randomIndex = utils.getRandomArbitrary(0, sourceArray.length);
  } while (historyArray.includes(randomIndex));
  return randomIndex;
}

const generateArray = (limit, arr) => {
  const result = [];
  const history = [];
  for (let i = limit; i > 0; i--) {

    const randomIndex = getNonRepeatingIndex(arr, history);
    history.push(randomIndex);
    const string = arr[randomIndex];
    result.push(string);
  }
  return result;
};

const generate = (count = 1) => {
  if (count > constants.MAX_LIMIT) {
    return ;
  };

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

  fs.writeFileSync(`mock.json`, JSON.stringify(offers, null, 4), function () {
    return 1;
  });
  return 0;
};

module.exports = {
  generate
};

