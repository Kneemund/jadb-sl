exports.help = {
	syntax: '!help',
	category: 'user',
	description: 'Displays this help section.'
};

exports.run = (client, message) => {
	let commandString = '';
	client.commands.forEach((command) => {
		if (command.help) commandString = commandString + `\`${command.help.syntax}\`\n${command.help.description}\n\n`;
	});

	const embed = {
		embed: {
			color: 0x3498db,
			title: 'HELP',
			description: '',
			fields: [
				{
					// "ALT + 0173" FOR CREATING AN EMPTY SPACE TO SEPERATE `MSG``MSG`
					name: 'COMMANDS',
					value: commandString
				}
			],
			thumbnail: {
				url: message.guild.iconURL
			},
			footer: {
				text: 'Underlined Commands are only for Admins/Developers'
			}
		}
	};

	message.channel.send('', embed);
};
