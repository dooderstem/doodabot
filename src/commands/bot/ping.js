export default {
  data: {
    name: 'ping',
    desc: "Checks the bot's latency.",
  },
  run: async (client, message, args) => {
    message.channel.send('Pong!');
  },
};
