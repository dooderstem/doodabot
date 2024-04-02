import mysql from 'mysql2';
import util from 'util';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

connection.queryAsync = util.promisify(connection.query);

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log(
    chalk.blue(chalk.bold(`System`)),
    chalk.white(`>>`),
    chalk.red(`MYSQL database`),
    chalk.green(`is ready!`)
  );
});

module.exports = connection;
export default connection;
