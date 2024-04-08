import Discord from 'discord.js';

export default async (bot, msg) => {
  if (msg.author.bot) return;

  const dmLog = new Discord.WebhookClient({
    url: bot.webhooks.dmLogs.url,
  });

  const dmLogEm = new Discord.EmbedBuilder()
    .setTitle(`💬・New DM message!`)
    .setDescription(`Bot has received a new DM message!`)
    .addFields({
      name: `**👤┆Send By:** ${msg.author} (${msg.author.tag})`,
      value: `__**💬┆Message:**__\n${msg.content}` || 'No content provided.',
    })
    .setColor(bot.config.colors.deb)
    .setTimestamp();

  if (msg.attachments.size > 0)
    dmLogEm.addField(
      `📃┆Attachments`,
      `${msg.attachments.first()?.url}`,
      false
    );

  const mentionBuilder = {
    embeds: [
      new Discord.EmbedBuilder()
        .setTitle(`Hi, i'm doodabot!`)
        .setDescription(
          'Sit do in mollit ipsum velit proident amet consequat ullamco do cupidatat.'
        )
        .addFields(
          {
            name: '📢┆Alert!',
            value:
              'Exercitation incididunt excepteur magna anim consequat sunt voluptate deserunt ullamco dolor cupidatat. Do exercitation laboris do nisi dolore ipsum veniam amet consectetur esse commodo veniam eiusmod velit.',
            inline: false,
          },
          {
            name: '📨┆Invite me',
            value: `Invite Bot in your own server! [Click here](${bot.config.discord.botInvite})`,
          },
          {
            name: '❓┆Need support?',
            value: `For questions you can join our [support server](${bot.config.discord.serverInvite})!`,
          },
          {
            name: '🐞┆Found a bug?',
            value: `Report all bugs via: \`/report bug\`!`,
          }
        )
        .setColor(bot.config.colors.normal),
    ],
    components: [
      new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel('Invite')
          .setURL(`${bot.config.discord.botInvite}`)
          .setStyle(5),
        new Discord.ButtonBuilder()
          .setLabel('Support server')
          .setURL(`${bot.config.discord.serverInvite}`)
          .setStyle(5)
      ),
    ],
  };

  if (msg.channel.type === 1) {
    if (
      msg.mentions.users.first() &&
      msg.mentions.users.first().id == bot.user.id &&
      msg.content.split(' ').length == 1
    ) {
      msg.react('👑');
      msg.react('⚔️');
      msg.channel.send(mentionBuilder);
    } else
      return dmLog.send({
        username: 'Logger',
        embeds: [dmLogEm],
      });
  }

  if (msg.guild) {
    let row = await bot.database.queryAsync(
      `SELECT * FROM guild WHERE Guild = '${msg.guild.id}';`
    );

    let guildSettings = row[0];

    if (!guildSettings) {
      await bot.database.queryAsync(
        `INSERT INTO guild (Guild, Prefix) VALUES ('${msg.guild.id}', '${discordConfig.prefix}');`
      );

      row = await bot.database.queryAsync(
        `SELECT * FROM guild WHERE Guild = '${msg.guild.id}';`
      );
      guildSettings = row[0];
    }

    if (!guildSettings || !guildSettings.Prefix) {
      row = await bot.database.queryAsync(
        `UPDATE guild SET Prefix = '${discordConfig.prefix}' WHERE Guild = '${msg.guild.id}';`
      );
      guildSettings = row[0];
    }

    let pfx;

    if (!guildSettings || !guildSettings.Prefix) pfx = discordConfig.prefix;
    else pfx = guildSettings.Prefix;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const prefixRegex = new RegExp(
      `^(<@!?${bot.user.id}>|${escapeRegex(pfx)})\\s*`
    );

    if (!prefixRegex.test(msg.content.toLowerCase())) return;

    const [, matchedPrefix] = msg.content.toLowerCase().match(prefixRegex);

    const args = msg.content.slice(matchedPrefix.length).trim().split(/ +/g);

    const cmdName = args.shift().toLowerCase();

    const cmd = bot.commands.get(cmdName);

    if (!cmd) return;

    if (cmd.data.perms && cmd.data.perms.length) {
      for (const perm of cmd.data.perms) {
        if (!msg.channel.permissionsFor(msg.member).has(perm)) {
          let errorEmbed = new Discord.EmbedBuilder()
            .setTitle('⛔┆ Access Denied: Missing permissions!')
            .setDescription(
              `This command requires **${cmd.data.perms}** permissions.`
            )
            .setColor(bot.config.colors.error);
          return msg.channel.send({
            embeds: [errorEmbed],
          });
        }
      }
    }

    await cmd.run(bot, msg, args);

    if (
      msg.mentions.users.first() &&
      msg.mentions.users.first().id == bot.user.id &&
      cmdName.length === 0
    ) {
      msg.react('👑');
      msg.react('⚔️');
      msg.channel.send(mentionBuilder);
    }
  }
};
