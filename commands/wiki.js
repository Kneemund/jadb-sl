const embeds = require('../util/embeds.js');

exports.help = {
	syntax: 'wiki',
	required: undefined,
	description: 'Send a link to the shader wiki.'
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
