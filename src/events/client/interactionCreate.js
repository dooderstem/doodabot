const Discord = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand() || interaction.isContextMenu()) {
    cmd.run(client, interaction, interaction.options._hoistedOptions);
  }
};
