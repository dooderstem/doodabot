require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');

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
    this.config = require('./config/bot');
    this.database = require('./database/connect');
    this.webhooks = require('./config/webhooks.json');
    this.commands = new Discord.Collection();
    this.interactions = new Discord.Collection();
  }
}

const doodabot = new Doodabot();
doodabot.login(process.env.DISCORD_TOKEN);
