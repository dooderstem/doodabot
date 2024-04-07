import Discord from 'discord.js';
import pop from 'popcat-wrapper';

export default {
  data: {
    name: 'npm',
    description: 'Search NPM for a package',
  },
  run: async function (client, msg, args) {
    if (!args.length) return msg.reply(`Please provide a search term.`);

    let result = await pop.npm(args[0]).catch((error) => {
      msg.reply(error.message);
    });

    const embed = new Discord.EmbedBuilder().setTitle(result.name).addFields(
      {
        name: '🏷️┇Version',
        value: `${result.version}`,
        inline: true,
      },
      {
        name: '📃┇Description',
        value: `${result.description}`,
        inline: true,
      },
      {
        name: '⌨️┇Keywords',
        value: `${result.keywords}`,
        inline: true,
      },
      {
        name: '💻┇Author',
        value: `${result.author}`,
        inline: true,
      },
      {
        name: '🔗┇Repository',
        value: `[Repo](${result.repository})`,
        inline: true,
      },
      {
        name: '📁┇Downloads',
        value: `${result.downloads_this_year}`,
        inline: true,
      },
      {
        name: '⏰┇Last publish',
        value: `<t:${Math.round(
          new Date(result.last_published).getTime() / 1000
        )}>`,
        inline: true,
      }
    );

    msg.channel.send({ embeds: [embed] });
  },
};
