'use strict';
const chalk = require(`chalk`);

module.exports = {
  printInfo: () => console.log(chalk.grey(`
  Программа учит Маргариту пользоваться CLI интерфейсом Node.js.
      Гайд:
      service <command>
      
      Команды:
      --version:            выводит номер версии
      --help:               печатает этот текст
      --generate <count>    формирует файл mocks.json
      
  `))
};
