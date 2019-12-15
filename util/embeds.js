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
				description: `\`${syntax}\``,
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
	}
};
