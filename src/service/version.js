'use strict';
const chalk = require('chalk');

const {version} = require(`../../package.json`);

module.exports = {
  getVersion: () => {
    console.log(chalk.blue(version));
  }
};
