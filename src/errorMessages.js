'use strict';
const chalk = require('chalk');

const commandUnknown = (command) => console.log(chalk.red(`No such command: ${command}`));
const generateMocksLimitExceeded = () => console.log(chalk.red(`Не больше 1000 объявлений`));

module.exports = {
  commandUnknown,
  generateMocksLimitExceeded
};
