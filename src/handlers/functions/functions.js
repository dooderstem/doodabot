export default async (client) => {

  client.loadSubcommands = async (client, interaction, args) => {
    return require(`${process.cwd()}/src/subcommands/${
    let cmdName = interaction.commandName;
    const subCmd = interaction.options.getSubcommand();
    const str = `../../../src/subcommands/${cmdName}/${subCmd}.js`;
    const { default: cmd } = await import(str);
    return await cmd(client, interaction, args);
  };
};
