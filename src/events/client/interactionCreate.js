import Discord from 'discord.js';

export default async (client, interaction) => {
  if (interaction.isChatInputCommand() || interaction.isContextMenu()) {
    const cmd = client.interactions.get(interaction.commandName);
    cmd.run(client, interaction, interaction.options._hoistedOptions);
  }
};
