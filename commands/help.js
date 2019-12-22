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

	if (page + 1 > maxPages || page < 0)
		return embeds.errorSyntax(message.channel, `${client[message.guild.id].prefix}${this.help.syntax}`);

	commands = commands.slice(commandsPerPage * page, commandsPerPage * (page + 1));

	let commandString = '';
	commands.forEach(commandName => {
		let command = client.commands.get(commandName);
		if (command.help)
			commandString =
				commandString +
				`\`${client[message.guild.id].prefix}${command.help.syntax}\`\n${command.help.description}\n\n`;
	});

	const embed = {
		embed: {
			color: 0x3498db,
			title: '',
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
			},
			author: {
				name: '­HELP',
				icon_url: 'https://img.icons8.com/color/48/000000/help--v1.png'
			}
		}
	};

	message.channel.send('', embed);
};
