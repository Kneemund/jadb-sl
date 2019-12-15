const embeds = require('../util/embeds.js');

exports.help = {
	syntax: '!wiki',
	category: 'user',
	description: 'Link to the official shader wiki.'
};

exports.run = (_client, message) => {
	embeds.answer(
		message.channel,
		'https://optifine.net/shaderPacks',
		'OFFICIAL SHADER WIKI',
		'https://shaders.fandom.com/wiki/Shader_Packs',
		true
	);
};
