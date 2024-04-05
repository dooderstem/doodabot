import config from '../config/bot.js';

export default async (db) => {
  // guild
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS \`guild\` (
        \`ID\` INT AUTO_INCREMENT PRIMARY KEY,
        \`Guild\` VARCHAR(255) NOT NULL UNIQUE,
        \`Prefix\` VARCHAR(3) NOT NULL DEFAULT '${config.discord.prefix}',
        \`Color\` VARCHAR(255) DEFAULT NULL,
        \`is_banned\` BOOLEAN NOT NULL DEFAULT FALSE,
        \`is_bot_here\` BOOLEAN NOT NULL DEFAULT TRUE
    );`);

  // messages
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS \`messages\` (
        \`Guild\` VARCHAR(255) NOT NULL UNIQUE,
        \`User\` VARCHAR(3) NOT NULL,
        \`Messages\` VARCHAR(255)
    );`);
};
