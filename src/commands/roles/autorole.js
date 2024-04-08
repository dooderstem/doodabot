import Discord from 'discord.js';

export default {
  data: {
    name: 'autorole',
    desc: '',
    aliases: [],
    perms: ['Administrator'],
  },
  run: async function (bot, msg, args) {
    let rows = await bot.database.queryAsync(
      `SELECT autorole_enabled, autorole_role FROM auto WHERE Guild = '${msg.guild.id}'`
    );

    let { autorole_enabled, autorole_role } = rows[0];
    autorole_enabled = Boolean(autorole_enabled);

    if (!args.length) {
      if (!autorole_enabled && !autorole_role) {
        return msg.channel.send({
          embeds: [
            new Discord.EmbedBuilder()
              .setTitle('📂┆ No autorole set.')
              .setColor(bot.config.colors.normal),
          ],
        });
      }
    }

    const findByRoleID = args[0].match(/(?<=<@&)(.*?)(?=>)/)
      ? args[0].match(/(?<=<@&)(.*?)(?=>)/)[0]
      : null;

    const findByRoleName = msg.guild.roles.cache.find(
      (role) => role.name === args[0]
    );

    let roleName;
    if (findByRoleID) {
      roleName = await msg.guild.roles.fetch(findByRoleID);
      console.log(roleName.name);
    } else if (findByRoleName) {
      roleName = findByRoleName.name;
      console.log(roleName);
    }

    // console.log(roleID);
  },
};
