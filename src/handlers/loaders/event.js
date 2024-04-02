import fs from 'fs';

export default function loadEvents(client) {
  fs.readdirSync('./src/events').forEach((dirs) => {
    const events = fs
      .readdirSync(`./src/events/${dirs}`)
      .filter((files) => files.endsWith('.js'));

    for (const file of events) {
      (async () => {
        const event = (await import(`../../events/${dirs}/${file}`)).default;
        client
          .on(file.split('.')[0], event.bind(null, client))
          .setMaxListeners(0);
      })();
    }
  });
}
