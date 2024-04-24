import dotenv from 'dotenv';

dotenv.config();

export default {
  staff: {
    owner: {
      name: 'dooderstem',
      id: '1028024502891843667',
    },
    admins: [
      {
        name: '',
        id: '',
      },
    ],
  },

  colors: {
    success: '#57F287',
    error: '#ED4245',
    normal: '#F0F8FF',
    deb: '#deb887',
  },

  discord: {
    id: '',
    prefix: '>>',
    footer: ``,
    botInvite: process.env.BOT_INVITE,
    serverInvite: process.env.SERVER_INVITE,
  },
};
