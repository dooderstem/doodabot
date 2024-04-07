import Discord from 'discord.js';

export default async (client, guild) => {
  let row = await client.database.queryAsync(
    `SELECT Guild FROM guild WHERE Guild = '${guild.id}';`
  );

  if (!row[0])
    await client.database.queryAsync(
      `INSERT INTO guild (Guild) VALUES ('${guild.id}');`
    );
};
