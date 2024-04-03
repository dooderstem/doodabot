export default async (connection) => {
  await connection.queryAsync(`CREATE TABLE IF NOT EXISTS GUILD(
        Guild VARCHAR(255) NOT NULL,
        Prefix VARCHAR(3) NOT NULL,
        Color VARCHAR(255) DEFAULT NULL
    );`);
  await connection.queryAsync(`CREATE TABLE IF NOT EXISTS MESSAGES(
        Guild VARCHAR(255) NOT NULL,
        User VARCHAR(3) NOT NULL,
        Messages VARCHAR(255)
    );`);
};
