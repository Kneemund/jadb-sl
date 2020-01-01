const request = require('request');
const embed = require('../util/embeds.js');

exports.help = {
	syntax: 'quote',
	required: undefined,
	description: 'Generate an inspirational quote using an [AI](https://inspirobot.me/ "Inspirobot").'
};

exports.run = async (_client, message) => {
	request
		.get('http://inspirobot.me/api?generate=true')
		.on('data', data => {
			const quote = {
				embed: {
					color: embed.COLORS.blue,
					title: '',
					description: '',
					author: {
						name: 'Inspirational Quote',
						icon_url: 'https://img.icons8.com/flat_round/64/000000/quote.png',
						url: 'https://inspirobot.me/'
					},
					footer: {
						text: 'https://inspirobot.me',
						icon_url: 'https://plus.google.com/_/favicon?domain_url=https://inspirobot.me'
					},
					image: {
						url: data.toString()
					}
				}
			};

			message.channel.send('', quote);
		})
		.on('error', err => {
			console.error(err);
			embed.error(message.channel, 'An error occurred while requesting the quote.');
		});
};
