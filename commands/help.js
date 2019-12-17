const embeds = require('../util/embeds.js');
const commandsPerPage = 6;

exports.help = {
	syntax: 'help [page]',
	category: 'user',
	required: undefined,
	description: 'Displays this help section.'
};

exports.run = (client, message, args) => {
	let commands = client.commands.keyArray();

	const page = args[0] - 1 || 0;
	const maxPages = Math.ceil(commands.length / commandsPerPage);
	this.help.syntax = `help [1-${maxPages}]`;

	if (page > maxPages) return embeds.errorSyntax(message.channel, `${client.config.prefix}${this.help.syntax}`);

	commands = commands.slice(commandsPerPage * page, commandsPerPage * (page + 1));

	let commandString = '';
	commands.forEach(commandName => {
		let command = client.commands.get(commandName);
		if (command.help)
			commandString =
				commandString + `\`${client.config.prefix}${command.help.syntax}\`\n${command.help.description}\n\n`;
	});

	const embed = {
		embed: {
			color: 0x3498db,
			title: 'HELP',
			description: '',
			fields: [
				{
					name: 'COMMANDS',
					value: commandString
				}
			],
			thumbnail: {
				url: message.guild.iconURL
			},
			footer: {
				text: `Currently viewing page ${page + 1} of ${maxPages}`
			}
		}
	};

	message.channel.send('', embed);
};
