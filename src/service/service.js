'use strict';

const version = require(`./version`);
const help = require(`./help`);
const generate = require(`./generate`);
const errors = require(`../errorMessages`);

const customCommands = [{
  name: `--version`,
  action: version.getVersion,
  description: `Outputs the version`
}, {
  name: `--help`,
  action: help.printInfo,
  description: `Shows the available commands`
}, {
  name: `--generate`,
  action: (count) => generate.run(count),
  description: `Outputs the version`
}];

const [
  commandName,
  ...params
] = process.argv.slice(2);

const command = customCommands.find(command => command.name === commandName);

if (command) {
  command.action(...params);
} else {
  errors.commandUnknown(commandName);
};

