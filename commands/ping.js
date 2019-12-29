const { COLORS } = require('../util/embeds.js');

exports.help = {
	syntax: 'ping',
	required: undefined,
	description: 'Display the calculated latency of the bot.'
};

exports.run = (client, message) => {
	const initial = {
		embed: {
			color: COLORS.blue,
			description: '',
			title: '',
			author: {
				name: 'PINGING...',
				icon_url: 'https://img.icons8.com/color/48/000000/help--v1.png'
			}
		}
	};

	message.channel.send('', initial).then(msg => {
		const latency = Math.floor(msg.createdAt - message.createdAt);
		const latencyAPI = Math.round(client.ping);

		const config = {
			embed: {
				color: COLORS.blue,
				description: `Latency: ${latency}ms\nAPI Latency: ${latencyAPI}ms`,
				title: '',
				author: {
					name: 'PING',
					icon_url: 'https://img.icons8.com/color/48/000000/help--v1.png'
				}
			}
		};

		msg.edit(config);
	});
};
