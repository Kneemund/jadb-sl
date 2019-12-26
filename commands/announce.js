const firestore = require('../api/firestore.js');
const embeds = require('../util/embeds.js');

exports.help = {
	syntax: `announce [message]`,
	category: 'dev',
	required: 'MANAGE_CHANNELS',
	description: 'Send an announcement to every user that wants to be notified about your channel.'
};

exports.run = async (client, message, args) => {
	const channelData = await firestore.getChannel(message.guild.id, message.channel.id);

	if (!channelData) return embeds.error(message.channel, 'This channel is not initialized.');
	if (!channelData.notify) return embeds.error(message.channel, 'There are no users on the notification list.');
	const notifyList = channelData.notify.filter(userID => message.guild.member(userID));

	let channelIconURL;
	try {
		if (channelData.download.thumbnail) {
			channelIconURL = channelData.download.favicon
				? `https://plus.google.com/_/favicon?domain_url=${channelData.download.thumbnail}`
				: channelData.download.thumbnail;
		} else {
			channelIconURL = message.author.displayAvatarURL;
		}
	} catch (e) {
		channelIconURL = message.author.displayAvatarURL;
	}

	let announcement = {
		embed: {
			title: '',
			description: `${args.join(' ')}`,
			color: embeds.COLORS.blue,
			image: {
				url: message.attachments.first() ? message.attachments.first().url : undefined
			},
			author: {
				name: `#${message.channel.name} (${message.guild.name})`,
				icon_url: channelIconURL
			}
		}
	};

	await message.channel.send('', announcement).then(m => {
		announcement.embed.description += `\n\n[Original Message](${m.url})`;
		message.delete();
	});

	notifyList.forEach(userID => {
		client.users.get(userID).send('', announcement);
	});

	embeds.feedback(
		message.channel,
		`Sent the announcement to \`${notifyList.length}\`/\`${channelData.notify.length}\` user(s).`,
		'',
		7500
	);
};
