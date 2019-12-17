const embeds = require('../util/embeds.js');

exports.help = {
	syntax: 'download',
	category: 'user',
	required: undefined,
	description: 'Get the channel-specific download link.'
};

exports.run = (client, message) => {
	try {
		if (!client.dataJSON.channel[message.channel]) {
			return embeds.error(message.channel, `${message.channel} is not initialized.`);
		}

		var values = client.dataJSON.channel[message.channel].download;
		if ((values.text == '' || !values.text) && (values.link == '' || !values.link)) throw Error;
		if (!values.text) values.text = '';
		if (!values.link) values.link = '';
		if (!values.thumbnail) values.thumbnail = [ '', '' ];

		embeds.answer(
			message.channel,
			`${values.text}\n${values.link}`,
			'DOWNLOAD',
			values.thumbnail[0],
			values.thumbnail[1] === 'true' ? true : false
		);
	} catch (error) {
		embeds.error(
			message.channel,
			`\`${client.config.prefix}${this.help.syntax}\` was not configured by the developer(s).`
		);
	}
};
