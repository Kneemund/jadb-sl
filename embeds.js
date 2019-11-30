const { RichEmbed } = require('discord.js');

const colors = {
	red: 0xe74c3c,
	green: 0x2ecc71,
	yellow: 0xf1c40f
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
	}
};
