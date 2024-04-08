import { SlashCommandBuilder } from '@discordjs/builders';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';
import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

export default async (bot) => {
  const interactions = [];

  // Load interactions
  const slash = await loadCommands('./src/interactions', bot.interactions);

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
  await loadCommands('./src/commands', bot.commands);
};

async function loadCommands(directory, collection) {
  const dirs = fs.readdirSync(directory);

  for (const dir of dirs) {
    const files = fs
      .readdirSync(path.join(directory, dir))
      .filter((file) => file.endsWith('.js'));

    for (const file of files) {
      const cmdFile = path.join(directory, dir, file);
      const { default: cmd } = await import(`../../../${cmdFile}`);

      if (
        cmd.data instanceof SlashCommandBuilder &&
        cmd.data.name.length >= 2 &&
        typeof cmd.run == 'function'
      )
        collection.set(cmd.data.name, cmd);
      else if (
        cmd.data &&
        cmd.data.name.length >= 2 &&
        typeof cmd.run == 'function'
      )
        collection.set(cmd.data.name, cmd);
    }
  }
  return collection;
}
