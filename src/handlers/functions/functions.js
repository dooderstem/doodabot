module.exports = async (client) => {

  client.loadSubcommands = async (client, interaction, args) => {
    return require(`${process.cwd()}/src/subcommands/${
      interaction.commandName
    }/${interaction.options.getSubcommand()}`)(client, interaction, args);
  };
};
