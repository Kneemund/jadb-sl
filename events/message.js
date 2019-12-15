const embeds = require('../util/embeds.js');

function includeReply(message) {
	if (message.content.toLowerCase().includes('no u')) message.channel.send('no u');
	if (message.content.toLowerCase().includes('rip'))
		message.channel.send('https://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2013/11/rip-786x305.jpg');
}

module.exports = (client, message) => {
	if (message.author.bot) return;
	includeReply(message);
	if (!message.content.startsWith(client.config.prefix)) return;

	const args = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd) return embeds.error(message.channel, `The command \`!${command}\` doesn't exist.`, 'INVALID COMMAND');
	cmd.run(client, message, args);
};
