import Discord from 'discord.js';
import dotenv from 'dotenv';
import express from 'express';
import chalk from 'chalk';
import fs from 'fs';

dotenv.config();

const webhook = JSON.parse(fs.readFileSync('src/config/webhooks.json', 'utf8'));
const packageJSON = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const startLogs = new Discord.WebhookClient({
  url: webhook.startLogs.url,
});

const shardLogs = new Discord.WebhookClient({
  url: webhook.shardLogs.url,
});

const doodabot = './src/bot.js';
const manager = new Discord.ShardingManager(doodabot, {
  totalShards: 2,
  token: process.env.DISCORD_TOKEN,
  respawn: true,
});

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.listen(3000);

console.clear();
console.log(
  chalk.blue(chalk.bold(`System`)),
  chalk.white(`>>`),
  chalk.green(`Starting up`),
  chalk.white(`...`)
);

manager.on('shardCreate', (shard) => {
  let embed = new Discord.EmbedBuilder()
    .setTitle(`🆙・Launching shard`)
    .setDescription(`A shard has just been launched`)
    .addFields({
      name: `🆔┆ID`,
      value: `${shard.id + 1}/${manager.totalShards}`,
      inline: true,
    });

  startLogs.send({
    username: 'Logger',
    embeds: [embed],
  });

  console.log(
    chalk.blue(chalk.bold(`System`)),
    chalk.white(`>>`),
    chalk.green(`Starting`),
    chalk.red(`Shard #${shard.id + 1}`),
    chalk.white(`...`)
  );

  shard.on('death', (process) => {
    const embed = new Discord.EmbedBuilder()
      .setTitle(
        `🚨・Closing shard ${shard.id + 1}/${manager.totalShards} unexpectedly`
      )
      .addFields(
        {
          name: `PID`,
          value: `\`${process.pid}\``,
        },
        {
          name: `Exit code`,
          value: `\`${process.exitCode}\``,
        }
      );

    shardLogs.send({
      username: 'Logger',
      embeds: [embed],
    });

    if (process.exitCode === null) {
      const embed = new Discord.EmbedBuilder().setTitle(
        `🚨・Shard ${shard.id + 1}/${
          manager.totalShards
        } exited with NULL error code!`
      );
      addFields(
        {
          name: 'PID',
          value: `\`${process.pid}\``,
        },
        {
          name: 'Exit code',
          value: `\`${process.exitCode}\``,
        }
      );

      shardLogs.send({
        username: 'Logger',
        embeds: [embed],
      });
    }
  });

  shard.on('shardDisconnect', (event) => {
    console.log('disconnected');
    console.log(event);
    const embed = new Discord.EmbedBuilder()
      .setTitle(`🚨・Shard ${shard.id + 1}/${manager.totalShards} disconnected`)
      .setDescription('Dumping socket close event...')
      .addFields({
        name: '🛑Shard disconnected',
        value: event,
      });
    shardLogs.send({
      username: 'Logger',
      embeds: [embed],
    });
  });

  shard.on('shardReconnecting', () => {
    const embed = new Discord.EmbedBuilder().setTitle(
      `🚨・Reconnecting shard ${shard.id + 1}/${manager.totalShards}`
    );
    shardLogs.send({
      username: 'Logger',
      embeds: [embed],
    });
  });
});

manager.spawn();
