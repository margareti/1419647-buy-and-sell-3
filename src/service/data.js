'use strict';

const {DateTime} = require(`luxon`);
const fs = require(`fs`);
const utils = require(`../utils`);
const errors = require(`../errorMessages`);
const constants = require(`../constants`);

const getNonRepeatingIndex = (sourceArray, historyArray) => {
  let randomIndex;
  do {
    randomIndex = utils.getRandomArbitrary(0, sourceArray.length);
  } while (historyArray.includes(randomIndex));
  return randomIndex;
};

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

const generateMocks = (count = 1) => {
  if (count > constants.MAX_LIMIT) {
    return errors.generateMocksLimitExceeded();
  }

  const offers = [];
  for (let i = count; i > 0; i--) {
    const title = utils.getRandomFromArray(constants.TITLES);
    const announce = generateArray(utils.getRandomArbitrary(1, 5), constants.DESCRIPTIONS).join(` `);
    const fullText = generateArray(utils.getRandomArbitrary(1, constants.DESCRIPTIONS.length), constants.DESCRIPTIONS).join(` `);
    const createdDate = DateTime.local().minus({days: utils.getRandomArbitrary(0, 90)}).toFormat(`yyyy-MM-dd hh:mm:ss`);
    const category = generateArray(utils.getRandomArbitrary(1, constants.CATEGORIES.length), constants.CATEGORIES);

    const offer = {
      title,
      announce,
      fullText,
      createdDate,
      category
    };
    offers.push(offer);
  }

  fs.writeFileSync(`mock.json`, JSON.stringify(offers, null, 4), () => 1);
  return 0;
};

module.exports = {
  generateMocks
};
