export default {
  data: {
    name: 'ping',
    description: "Checks the bot's latency.",
  },
  run: async (client, message, args) => {
    message.channel.send('Pong!');
  },
};
