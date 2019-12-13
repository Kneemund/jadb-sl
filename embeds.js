// const { RichEmbed } = require('discord.js');

const COLORS = {
	red: 0xe74c3c,
	green: 0x2ecc71,
	yellow: 0xf1c40f,
	blue: 0x3498db
};

module.exports = {
	error(channel, content, title) {
		var config = {
			embed: {
				color: COLORS.red,
				description: content,
				title: title
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	errorSyntax(channel, syntax) {
		var config = {
			embed: {
				color: COLORS.red,
				description: syntax,
				title: 'SYNTAX ERROR'
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	errorAuthorized(channel, command) {
		var config = {
			embed: {
				color: COLORS.red,
				description: command,
				title: 'INSUFFICIENT PERMISSIONS'
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	feedback(channel, content, title, timeout) {
		var config = {
			embed: {
				color: COLORS.green,
				description: content,
				title: title
			}
		};

		channel.send('', config).then((msg) => {
			if (timeout) msg.delete(timeout);
		});
	},

	answer(channel, content, title, thumbnailURL, thumbnailFromDomain) {
		var config = {
			embed: {
				color: COLORS.blue,
				description: content,
				title: title,
				thumbnail: {
					url: thumbnailFromDomain
						? `https://plus.google.com/_/favicon?domain_url=${thumbnailURL}`
						: thumbnailURL
				}
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	help(channel, thumbnailURL) {
		const config = {
			embed: {
				color: COLORS.blue,
				title: 'HELP',
				description: '',
				fields: [
					{
						name: 'COMMANDS',
						// "ALT + 0173" FOR CREATING AN EMPTY SPACE TO SEPERATE `MSG``MSG`
						value:
							'`!help`\n' +
							'Displays this help section.\n\n' +
							'`!wiki`\n' +
							'Link to the official shader wiki.\n\n' +
							'`!optifine `­`<­`­`download`|`server`­`>`\n' +
							'Links to optifine-related stuff.\n\n' +
							'`!channel `­`<­`­`info`|__`config`__|__`init`__|__`reset`__`>`\n' +
							'Commands to manage and get information about channels.\n\n' +
							'__`!purge`__` <`­`amount`­`>`\n' +
							'Delete up to 100 messages at a time that are less than 2 weeks old.'
					}
				],
				thumbnail: {
					url: thumbnailURL
				},
				footer: {
					text: 'Underlined Commands are only for Admins/Developers'
				}
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	}
};
