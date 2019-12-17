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

		channel.send('', config);
	},

	errorSyntax(channel, syntax) {
		var config = {
			embed: {
				color: COLORS.red,
				description: `\`${syntax}\``,
				title: 'SYNTAX ERROR'
			}
		};

		channel.send('', config);
	},

	errorAuthorized(channel, command, missingPermissions) {
		var config = {
			embed: {
				color: COLORS.red,
				description: command,
				title: 'INSUFFICIENT PERMISSIONS',
				footer: {
					text: `Missing permissions: ${missingPermissions}`
				}
			}
		};

		channel.send('', config);
	},

	feedback(channel, content, title, timeout) {
		var config = {
			embed: {
				color: COLORS.green,
				description: content,
				title: title
			}
		};

		channel.send('', config).then(msg => {
			if (timeout) msg.delete(timeout);
		});
	},

	feedbackReason(channel, content, title, field_value) {
		var config = {
			embed: {
				color: COLORS.green,
				description: content,
				title: title,
				fields: [
					{
						name: 'REASON',
						value: field_value
					}
				]
			}
		};

		channel.send('', config);
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

		channel.send('', config);
	}
};
