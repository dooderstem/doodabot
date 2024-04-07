import Discord from 'discord.js';

export default {
  data: {
    name: 'autorole',
    description: '',
    aliases: [],
    perms: [],
  },
  run: async function (bot, msg, args) {
    let rows = await bot.database.queryAsync(
      `SELECT autorole_enabled, autorole_role FROM auto WHERE Guild = '${msg.guild.id}'`
    );

    let { autorole_enabled, autorole_role } = rows[0];
    autorole_enabled = Boolean(autorole_enabled);

    if (!args.length) {
      if (!autorole_enabled && !autorole_role) {
        return msg.reply('Please set an autorole.');
      }
    }
  },
};
