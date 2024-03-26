const Discord = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('bot')
    .setDescription('Information about the bot')
    .addSubcommand((subcommand) =>
      subcommand.setName('ping').setDescription('See the bots ping in ms')
    ),
  run: (client, interaction, args) => {
    client.loadSubcommands(client, interaction, args);
  },
};
