import mysql from 'mysql2';
import util from 'util';
import chalk from 'chalk';
import dotenv from 'dotenv';

dotenv.config();

const database = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PW,
  database: process.env.MYSQL_DB,
});

database.queryAsync = util.promisify(database.query);

database.connect((err) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }

  console.log(
    chalk.blue(chalk.bold(`System`)),
    chalk.white(`>>`),
    chalk.red(`MYSQL database`),
    chalk.green(`is ready!`)
  );
});

import tables from './schema.js';
await tables(database);

export default database;
