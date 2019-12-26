const embeds = require('../util/embeds.js');
const firestore = require('../api/firestore.js');

exports.help = {
	syntax: 'download',
	category: 'user',
	required: undefined,
	description: 'Get the channel-specific download link.'
};

exports.run = async (client, message) => {
	const channelData = await firestore.getChannel(message.guild.id, message.channel.id);

	try {
		if (channelData) {
			var values = channelData.download;
			if ((values.text == '' || !values.text) && (values.link == '' || !values.link)) throw Error;

			embeds.answer(
				message.channel,
				`${values.text || ''}\n${values.link || ''}`,
				'DOWNLOAD',
				values.thumbnail || '',
				values.favicon || false
			);
		} else {
			embeds.error(message.channel, `${message.channel} is not initialized.`);
		}
	} catch (error) {
		embeds.error(
			message.channel,
			`\`${client[message.guild.id].prefix}${this.help.syntax}\` was not configured by the developer(s).`
		);
	}
};
