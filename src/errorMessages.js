'use strict';

const commandUnknown = (command) => console.log(`No such command: ${command}`);
const generateMocksLimitExceeded = () => console.log(`Не больше 1000 объявлений`);

module.exports = {
  commandUnknown,
  generateMocksLimitExceeded
};
