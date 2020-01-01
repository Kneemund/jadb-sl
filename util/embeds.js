const COLORS = {
	red: 0xe74c3c,
	green: 0x2ecc71,
	yellow: 0xf1c40f,
	blue: 0x3498db
};

module.exports = {
	COLORS,

	error(channel, content, title) {
		const config = {
			embed: {
				color: COLORS.red,
				description: content,
				title: '',
				author: {
					name: title || 'ERROR',
					icon_url: 'https://img.icons8.com/color/48/000000/cancel--v1.png'
				}
			}
		};

		channel.send('', config);
	},

	errorSyntax(channel, syntax) {
		const config = {
			embed: {
				color: COLORS.red,
				description: `\`${syntax}\``,
				title: '',
				author: {
					name: 'SYNTAX ERROR',
					icon_url: 'https://img.icons8.com/color/48/000000/cancel--v1.png'
				}
			}
		};

		channel.send('', config);
	},

	errorAuthorized(channel, command, missingPermissions) {
		const config = {
			embed: {
				color: COLORS.red,
				description: command,
				title: '',
				footer: {
					text: `Missing permissions: ${missingPermissions}`
				},
				author: {
					name: 'INSUFFICIENT PERMISSIONS',
					icon_url: 'https://img.icons8.com/color/48/000000/cancel--v1.png'
				}
			}
		};

		channel.send('', config);
	},

	feedback(channel, content, title, timeout) {
		const config = {
			embed: {
				color: COLORS.green,
				description: content,
				title: title,
				author: {
					name: title || 'SUCCESS',
					icon_url: 'https://img.icons8.com/color/48/000000/ok--v1.png'
				}
			}
		};

		channel.send('', config).then(msg => {
			if (timeout) msg.delete(timeout);
		});
	},

	feedbackReason(channel, content, title, field_value) {
		const config = {
			embed: {
				color: COLORS.green,
				description: content,
				title: '',
				fields: [
					{
						name: 'REASON',
						value: field_value
					}
				],
				author: {
					name: title || 'SUCCESS',
					icon_url: 'https://img.icons8.com/color/48/000000/ok--v1.png'
				}
			}
		};

		channel.send('', config);
	},

	answer(channel, content, title, thumbnailURL, thumbnailFromDomain, iconURL) {
		const config = {
			embed: {
				color: COLORS.blue,
				description: content,
				title: '',
				thumbnail: {
					url: thumbnailFromDomain
						? `https://plus.google.com/_/favicon?domain_url=${thumbnailURL}`
						: thumbnailURL
				},
				author: {
					name: title,
					icon_url: iconURL
				}
			}
		};

		channel.send('', config);
	}
};
