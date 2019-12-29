const embeds = require('../util/embeds');

function duration(ms) {
	const s = Math.floor((ms / 1000) % 60).toString();
	const min = Math.floor((ms / (1000 * 60)) % 60).toString();
	const h = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
	const d = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();

	return `${d.padStart(1, '0')}d ${h.padStart(2, '0')}h ${min.padStart(2, '0')}min ${s.padStart(2, '0')}s`;
}

exports.help = {
	syntax: 'uptime',
	required: undefined,
	description: 'Show the uptime of the bot.'
};

exports.run = (client, message) => {
	embeds.answer(message.channel, duration(client.uptime), 'UPTIME');
};
