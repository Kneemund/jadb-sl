const embeds = require('../util/embeds.js');

function cmdDownload(message) {
	embeds.answer(
		message.channel,
		'https://optifine.net/downloads',
		'OPTIFINE DOWNLOAD',
		'https://optifine.net/downloads',
		true
	);
}

function cmdServer(message) {
	embeds.answer(
		message.channel,
		'https://discord.gg/3mMpcwW',
		'OPTIFINE SERVER',
		'https://cdn.discordapp.com/icons/423430686880301056/a_4d188ade721bd63fc413bd7f8651a2e2.webp?size=32',
		false
	);
}

exports.subCommands = {
	download: cmdDownload,
	server: cmdServer
};

exports.help = {
	syntax: `optifine <${Object.keys(this.subCommands).join('|')}>`,
	category: 'user',
	required: {
		download: undefined,
		server: undefined
	},
	description: 'Links related to Optifine.'
};

exports.run = (_client, message, args) => {
	this.subCommands[args[0]](message);
};
