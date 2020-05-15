'use strict';

const fs = require(`fs`).promises;
const path = require(`path`);

const chalk = require(`chalk`);

const utils = require(`../utils`);
const errors = require(`../errorMessages`);
const constants = require(`../constants`);

const FILE_SENTENCES_PATH = `./data/sentences.txt`;
const FILE_TITLES_PATH = `./data/titles.txt`;
const FILE_CATEGORIES_PATH = `./data/categories.txt`;
const TYPES = [`offer`, `sale`];

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, filePath), `utf-8`);
    return content.split(`\n`);
  } catch (err) {
    console.log(chalk.red(err));
    return [];
  }
};

const getPicture = (num) => `item${num < 10 ? `0${num}` : num}.jpg`;
const generateOffers = (count, titles, categories, sentences) => {
  return Array(parseInt(count, 10)).fill({}).map(() => ({
    category: utils.shuffle(categories).slice(1, utils.getRandomArbitrary(0, categories.length - 1)),
    title: titles[utils.getRandomArbitrary(0, titles.length - 1)],
    description: utils.shuffle(sentences).slice(0, 5).join(` `),
    type: TYPES[utils.getRandomArbitrary(0, TYPES.length - 1)],
    picture: getPicture(Math.floor(Math.random() * 16)),
    sum: utils.getRandomArbitrary(1000, 100000),
  }));
};

const run = async (count = 1) => {
  if (count > constants.MAX_LIMIT) {
    return errors.generateMocksLimitExceeded();
  }

  const titles = await readContent(FILE_TITLES_PATH);
  const sentences = await readContent(FILE_SENTENCES_PATH);
  const categories = await readContent(FILE_CATEGORIES_PATH);
  const offers = generateOffers(count, titles, categories, sentences);
  try {
    return await fs.writeFile(`mock.json`, JSON.stringify(offers, null, 4));
  } catch (err) {
    return process.exit(1);
  }
};

module.exports = {
  run
};
