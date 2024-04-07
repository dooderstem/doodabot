dotenv.config();
import Discord from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

import database from './database/connect.js';
import config from './config/bot.js';

class Doodabot extends Discord.Client {
  constructor() {
    super({
      intents: [
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildWebhooks,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.MessageContent,
      ],
      partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message,
        Discord.Partials.User,
      ],
    });
    this.config = config;
    this.database = database;
    this.webhooks = JSON.parse(
      fs.readFileSync('src/config/webhooks.json', 'utf8')
    );
    this.commands = new Discord.Collection();
    this.interactions = new Discord.Collection();
  }
}

const doodabot = new Doodabot();

((doodabot) => {
  fs.readdirSync('./src/handlers').forEach((dirs) => {
    fs.readdirSync(`./src/handlers/${dirs}`).forEach(async (handlers) => {
      const { default: handlerFunction } = await import(
        `./handlers/${dirs}/${handlers}`
      );
      handlerFunction(doodabot);
    });
  });
})(doodabot);

doodabot.login(process.env.DISCORD_TOKEN);
