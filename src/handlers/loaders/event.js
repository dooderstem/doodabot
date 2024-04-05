import fs from 'fs';

export default function loadEvents(client) {
  fs.readdirSync('./src/events').forEach(async (dirs) => {
    const events = fs
      .readdirSync(`./src/events/${dirs}`)
      .filter((files) => files.endsWith('.js'));

    for (const file of events) {
      const { default: event } = await import(`../../events/${dirs}/${file}`);
      if (event && typeof event === 'function')
        client
          .on(file.split('.')[0], event.bind(null, client))
          .setMaxListeners(0);
    }
  });
}
