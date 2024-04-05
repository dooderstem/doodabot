import Discord from 'discord.js';

export default async (client, message) => {
  const msg = message;
  const discordConfig = client.config.discord;
  if (msg.author.bot) return;

  const dmLog = new Discord.WebhookClient({
    url: client.webhooks.dmLogs.url,
  });

  let dmLogEm = new Discord.EmbedBuilder()
    .setTitle(`💬・New DM message!`)
    .setDescription(`Bot has received a new DM message!`)
    .addFields({
      name: `**👤┆Send By:** ${msg.author} (${msg.author.tag})`,
      value: `__**💬┆Message:**__\n${msg.content}` || 'No content provided.',
    })
    .setColor(client.config.colors.normal)
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
            value: `Invite Bot in your own server! [Click here](${discordConfig.botInvite})`,
          },
          {
            name: '❓┆Need support?',
            value: `For questions you can join our [support server](${discordConfig.serverInvite})!`,
          },
          {
            name: '🐞┆Found a bug?',
            value: `Report all bugs via: \`/report bug\`!`,
          }
        )
        .setColor(client.config.colors.normal),
    ],
    components: [
      new Discord.ActionRowBuilder().addComponents(
        new Discord.ButtonBuilder()
          .setLabel('Invite')
          .setURL(`${discordConfig.botInvite}`)
          .setStyle(5),
        new Discord.ButtonBuilder()
          .setLabel('Support server')
          .setURL(`${discordConfig.serverInvite}`)
          .setStyle(5)
      ),
    ],
  };

  if (msg.channel.type === 1) {
    if (
      msg.mentions.users.first() &&
      msg.mentions.users.first().id == client.user.id &&
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
    let row = await client.database.queryAsync(
      `SELECT * FROM \`guild\` WHERE \`Guild\` = '${msg.guild.id}';`
    );

    let guildSettings = row[0];

    if (!guildSettings) {
      await client.database.queryAsync(
        `INSERT INTO \`guild\` (\`Guild\`, \`Prefix\`) VALUES ('${msg.guild.id}', '${discordConfig.prefix}');`
      );

      row = await client.database.queryAsync(
        `SELECT * FROM \`guild\` WHERE \`Guild\` = '${msg.guild.id}';`
      );
      guildSettings = row[0];
    }

    if (!guildSettings || !guildSettings.Prefix) {
      row = await client.database.queryAsync(
        `UPDATE \`guild\` SET \`Prefix\` = '${discordConfig.prefix}' WHERE \`Guild\` = '${msg.guild.id}';`
      );
      guildSettings = row[0];
    }

    let pfx;

    if (!guildSettings || !guildSettings.Prefix) pfx = discordConfig.prefix;
    else pfx = guildSettings.Prefix;

    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const prefixRegex = new RegExp(
      `^(<@!?${client.user.id}>|${escapeRegex(pfx)})\\s*`
    );

    if (!prefixRegex.test(msg.content.toLowerCase())) return;

    const [, matchedPrefix] = msg.content.toLowerCase().match(prefixRegex);

    const args = message.content
      .slice(matchedPrefix.length)
      .trim()
      .split(/ +/g);

    const cmdName = args.shift().toLowerCase();

    const cmd = client.commands.get(cmdName);

    if (!cmd) return;
    else await cmd.run(client, message, args);

    if (
      msg.mentions.users.first() &&
      msg.mentions.users.first().id == client.user.id &&
      cmdName.length === 0
    ) {
      msg.react('👑');
      msg.react('⚔️');
      msg.channel.send(mentionBuilder);
    }
  }
};
