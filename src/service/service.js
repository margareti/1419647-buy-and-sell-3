'use strict';

const version = require(`./version`);
const help = require(`./help`);
const dummyDataCenter = require(`./data`);
const cliArgs = process.argv.slice(2);
const errors = require(`../errorMessages`);

const customCommands = [{
  name: `version`,
  action: version.getVersion,
  description: `Outputs the version`
}, {
  name: `help`,
  action: help.printInfo,
  description: `Shows the available commands`
}, {
  name: `generate`,
  action: (count) => dummyDataCenter.generateMocks(count),
  description: `Outputs the version`
}];

const getCommand = (commandName) => customCommands.find((command) => command.name === commandName) || null;

const parameters = cliArgs.join(` `).split(`--`).filter((item) => item);
parameters.forEach((item) => {
  const splitCommand = item.split(` `);
  const customCommand = getCommand(splitCommand[0]);
  if (customCommand) {
    return customCommand.action(splitCommand[1]);
  }
  return errors.commandUnknown(item);
});
