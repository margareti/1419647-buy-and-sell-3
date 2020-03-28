'use strict';
const version = require(`./showVersion`);
const samples = require(`./generateCount`);
const help = require(`./showHelp`);

const [...restOfArgs] = process.argv.slice(2);

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
  action: (count) => samples.generateCount(count),
  description: `Outputs the version`
}];

const getCommand = (commandName) => customCommands.find((command) => command.name === commandName) || null;

const parameters = restOfArgs.join(` `).split(`--`).filter((item) => item);
parameters.forEach((item) => {
  const splitCommand = item.split(` `);
  const customCommand = getCommand(splitCommand[0]);
  if (customCommand) {
    return customCommand.action(splitCommand[1]);
  }
  return console.log(`No such command: ${item}`);
});
