'use strict';

const {version} = require(`../../package.json`);
const getVersion = () => console.log(version)
module.exports = {
  getVersion
};

