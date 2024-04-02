import Discord from 'discord.js';
import chalk from 'chalk';

export default async (client) => {
  const readyLogs = new Discord.WebhookClient({
    url: client.webhooks.readyLogs.url,
  });

  const username = client.user.username;

  readyLogs.send({
    username: 'Logger',
    embeds: [
      new Discord.EmbedBuilder()
        .setTitle(`🔋 ${username} is ready!`)
        .setTimestamp(),
    ],
  });

  const activities = [
    { name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
    { name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
    { name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
  ];
  const status = ['online', 'dnd', 'idle'];

  let i = 0;
  setInterval(() => {
    if (i >= activities.length) i = 0;
    client.user.setActivity(activities[i]);
    i++;
  }, 5000);


  console.log(
    chalk.blue(chalk.bold(`System`)),
    chalk.white(`>>`),
    chalk.red(`${username}`),
    chalk.green(`is ready!`)
  );
};
