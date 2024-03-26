const Discord = require('discord.js');
const chalk = require('chalk');

module.exports = async (client, e) => {
  const errorLogs = new Discord.WebhookClient({
    url: client.webhooks.errorLogs.url,
  });

  const stackName = e.name;
  const stackMessage = e.message;
  const stackTrace = e.stack.split('\n')[1];
  const errorString = `${stackName}: ${stackMessage}\n${stackTrace}\n`;

  console.log(
    chalk.red('\r\n' + stackName),
    chalk.white(stackMessage),
    chalk.grey('\r\n' + stackTrace + '\r\n')
  );

  errorLogs.send({
    username: 'Logger',
    embeds: [
      new Discord.EmbedBuilder()
        .setTitle('🚨 An error has occurred')
        .setDescription('```' + errorString + '```')
        .setTimestamp(),
    ],
  });
};
