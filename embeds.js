// const { RichEmbed } = require('discord.js');

const colors = {
	red: 0xe74c3c,
	green: 0x2ecc71,
	yellow: 0xf1c40f,
	blue: 0x3498db
};

module.exports = {
	error(channel, content, title) {
		var config = {
			embed: {
				color: colors.red,
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
				color: colors.red,
				description: syntax,
				title: 'Syntax Error'
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	errorAuthorized(channel, command) {
		var config = {
			embed: {
				color: colors.red,
				description: command,
				title: 'Insufficient Permissions'
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	feedback(channel, content, title) {
		var config = {
			embed: {
				color: colors.green,
				description: content,
				title: title
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	},

	answer(channel, content, title, thumbnailURL, thumbnailFromDomain) {
		var config = {
			embed: {
				color: colors.blue,
				description: content,
				title: title,
				thumbnail: {
					url: thumbnailFromDomain ? `https://plus.google.com/_/favicon?domain_url=${thumbnailURL}` : thumbnailURL
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
				color: colors.blue,
				title: 'Help',
				description: 'Commands:',
				fields: [
					{
						name: '`!help`',
						value: 'Displays this help section.'
					},
					{
						name: '`!wiki`',
						value: 'Link to the official shader wiki.'
					},
					{
						name: '`!optifine <download|server>`',
						value: 'Links to optifine-related stuff.'
					},
					{
						name: '`!channel <info|config|init|reset>`',
						value: 'Commands to manage and get information about shader channels.'
					}
				],
				thumbnail: {
					url: thumbnailURL
				}
			}
		};

		channel.send('', config).then((msg) => {
			return msg;
		});
	}
};
