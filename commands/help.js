const embeds = require('../util/embeds.js');
const commandsPerPage = 6;

exports.help = {
	syntax: 'help [PAGE]',
	required: undefined,
	description: 'Send a message with 6 commands per page and brief explanations/usage information.'
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
		let syntax = `\`${client[message.guild.id].prefix}${command.help.syntax}\``;
		let description = command.help.description;

		if (command.help) {
			if (!command.subCommands && command.help.required) {
				if (!message.member.permissionsIn(message.channel).has(command.help.required)) {
					syntax = `*${syntax}*`;
					description = `*${description}*`;
				}
			}

			commandString += `${syntax}\n${description}\n\n`;
		}
	});

	const embed = {
		embed: {
			color: embeds.COLORS.blue,
			title: '',
			description: '',
			fields: [
				{
					name: 'COMMANDS',
					value:
						commandString +
						'[ᴅᴇᴛᴀɪʟᴇᴅ ʟɪꜱᴛ](https://github.com/NiemandTV/jadb-sl/blob/master/README.md "Detailed list of all commands.")'
				}
			],
			thumbnail: {
				url: message.guild.iconURL
			},
			footer: {
				text: `Currently viewing page ${page + 1} of ${maxPages}.`
			},
			author: {
				name: '­HELP',
				icon_url: 'https://img.icons8.com/color/48/000000/help--v1.png'
			}
		}
	};

	message.channel.send('', embed);
};
