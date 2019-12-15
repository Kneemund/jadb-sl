const embeds = require('../util/embeds.js');

module.exports = (client, message) => {
	if (message.author.bot) return;
	if (message.content.toLowerCase().includes('no u')) message.channel.send('no u');
	if (!message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return embeds.error(message.channel, `The command \`!${command}\` doesn't exist.`, 'INVALID COMMAND');
	cmd.run(client, message, args);
};
