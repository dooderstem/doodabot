const Discord = require('discord.js');

module.exports = async (client, interaction) => {
  if (interaction.isChatInputCommand() || interaction.isContextMenu()) {
    const cmd = client.interactions.get(interaction.commandName);

    cmd.run(client, interaction, interaction.options._hoistedOptions);
  }
};
