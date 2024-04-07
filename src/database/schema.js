import config from '../config/bot.js';

export default async (db) => {
  // guild
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS \`guild\` (
        ID INT AUTO_INCREMENT PRIMARY KEY,
        Guild VARCHAR(20) NOT NULL UNIQUE,
        Prefix VARCHAR(3) NOT NULL DEFAULT '${config.discord.prefix}',
        Color VARCHAR(7),
        is_banned BOOLEAN NOT NULL DEFAULT FALSE,
        is_bot_here BOOLEAN NOT NULL DEFAULT TRUE);`);

  // messages
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS \`messages\` (
        Guild VARCHAR(20) NOT NULL UNIQUE,
        User VARCHAR(3) NOT NULL,
        Messages VARCHAR(255)
        REFERENCES parent(Guild));`);

  // auto
  await db.queryAsync(`CREATE TABLE IF NOT EXISTS \`auto\` (
        Guild VARCHAR(20) NOT NULL UNIQUE,
        autorole_enabled BOOLEAN NOT NULL DEFAULT false,
        autorole_role VARCHAR(255),
        bye_enabled BOOLEAN NOT NULL DEFAULT false,
        bye_channel VARCHAR(255),
        bye_message TEXT,
        bye_embed_enabled BOOLEAN NOT NULL DEFAULT false,
        bye_embed_color VARCHAR(7),
        bye_embed_image TEXT,
        greet_enabled BOOLEAN NOT NULL DEFAULT false,
        greet_channel VARCHAR(255),
        greet_message TEXT,
        greet_embed_enabled BOOLEAN NOT NULL DEFAULT false,
        greet_embed_color VARCHAR(7),
        greet_embed_image TEXT,
        greetdm_enabled BOOLEAN NOT NULL DEFAULT false,
        greetdm_message TEXT,
        greetdm_embed_enabled BOOLEAN NOT NULL DEFAULT false,
        greetdm_embed_color VARCHAR(7),
        greetdm_embed_image TEXT
        REFERENCES parent(Guild));`);

  await db.queryAsync(`CREATE TRIGGER IF NOT EXISTS auto_trigger
        AFTER INSERT ON guild
        FOR EACH ROW
        BEGIN
            INSERT INTO auto (Guild) VALUES (NEW.Guild);
        END;`);
  await db.queryAsync(`CREATE TRIGGER IF NOT EXISTS messages_trigger
        AFTER INSERT ON guild
        FOR EACH ROW
        BEGIN
            INSERT INTO messages (Guild) VALUES (NEW.Guild);
        END;`);
};
