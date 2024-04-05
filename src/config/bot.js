import dotenv from 'dotenv';
dotenv.config();

export default {
  colors: {
    success: '#57F287',
    error: '#ED4245',
    normal: '#deb887',
  },

  discord: {
    id: '',
    prefix: '>>',
    footer: ``,
    botInvite: process.env.BOT_INVITE,
    serverInvite: process.env.SERVER_INVITE,
  },
};
