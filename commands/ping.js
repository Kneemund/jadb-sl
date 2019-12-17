exports.help = {
	syntax: 'ping',
	category: 'user',
	required: undefined,
	description: 'Displays the latency of the bot.'
};

exports.run = (client, message) => {
	const initial = {
		embed: {
			color: 0x3498db,
			description: '',
			title: 'PINGING...'
		}
	};

	message.channel.send('', initial).then(msg => {
		const latency = Math.floor(msg.createdAt - message.createdAt);
		const latencyAPI = Math.round(client.ping);

		const config = {
			embed: {
				color: 0x3498db,
				description: `Latency: ${latency}ms\nAPI Latency: ${latencyAPI}ms`,
				title: 'PING'
			}
		};

		msg.edit(config);
	});
};
