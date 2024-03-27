const Discord = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const chalk = require('chalk');
const fs = require('fs');

module.exports = async (client) => {
  const interactions = [];

  // Load interactions
  const slash = loadFromDirectory(
    client,
    './src/interactions',
    client.interactions
  );

  slash.each((cmd) => interactions.push(cmd.data));

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
  (async () => {
    try {
      await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
        body: interactions,
      });
    } catch (error) {
      console.error(error);
    }
  })();

  // Load commands
  const cmds = loadFromDirectory(client, './src/commands', client.commands);

  cmds.each((cmd) => client.commands.set(cmd.data.name, cmd));
};

function loadFromDirectory(client, directory, collection) {
  fs.readdirSync(directory).forEach((dirs) => {
    const files = fs
      .readdirSync(`${directory}/${dirs}`)
      .filter((file) => file.endsWith('.js'));

    for (const file of files) {
      const item = require(`${process.cwd()}/${directory}/${dirs}/${file}`);
      collection.set(item.data.name, item);
    }
  });
  return collection;
}
