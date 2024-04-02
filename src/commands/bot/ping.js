export default {
  data: {
    name: 'ping',
    description: "Checks the bot's latency.",
  },
  run: async (client, message, args) => {
    if (!args) message.reply('Pong!');
  },
};
