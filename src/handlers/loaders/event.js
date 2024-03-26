const fs = require('fs');

module.exports = (client) => {
  fs.readdirSync('./src/events').forEach((dirs) => {
    const events = fs
      .readdirSync(`./src/events/${dirs}`)
      .filter((files) => files.endsWith('.js'));

    for (const file of events) {
      const event = require(`../../events/${dirs}/${file}`);
      client
        .on(file.split('.')[0], event.bind(null, client))
        .setMaxListeners(0);
    }
  });
};
