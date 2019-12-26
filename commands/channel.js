const embeds = require('../util/embeds.js');
const firestore = require('../api/firestore.js');
const URL = require('url').URL;

function verifyURL(string) {
	try {
		new URL(string);
		return true;
	} catch (err) {
		return false;
	}
}

async function cmdInit(client, message) {
	if (message.mentions.users.first()) {
		const channelData = await firestore.getChannel(message.guild.id, message.channel.id);
		const channelDev = message.mentions.users.keyArray();

		if (channelData) {
			if (channelData.dev) {
				message.channel.permissionOverwrites
					.filter(element => channelData.dev.includes(element.id))
					.deleteAll();
			}
		}

		firestore.updateChannel(message.guild.id, message.channel.id, { dev: channelDev });

		channelDev.forEach(element => {
			message.channel.overwritePermissions(element, {
				MANAGE_CHANNELS: true,
				MANAGE_WEBHOOKS: true,
				SEND_MESSAGES: true
			});
		});

		embeds.feedback(message.channel, `Linked <@${channelDev.join('>, <@')}> with ${message.channel}.`);
	} else {
		embeds.errorSyntax(message.channel, `\`${client[message.guild.id].prefix}channel init @developer [...]\``);
	}
}

async function cmdReset(_client, message) {
	const channelData = await firestore.getChannel(message.guild.id, message.channel.id);
	if (channelData) {
		if (channelData.dev) {
			message.channel.permissionOverwrites.filter(element => channelData.dev.includes(element.id)).deleteAll();
		}

		firestore.deleteChannel(message.guild.id, message.channel.id);
		embeds.feedback(message.channel, `${message.channel} was reset.`);
	} else {
		embeds.error(message.channel, `${message.channel} is not initialized.`);
	}
}

async function cmdConfig(client, message, args) {
	const channelData = await firestore.getChannel(message.guild.id, message.channel.id);
	if (channelData) {
		var value = args.slice(2);
		if (!value) value = firestore.deleteField();
		switch (args[1]) {
			case 'text':
				firestore.updateChannel(message.guild.id, message.channel.id, { download: { text: value.join(' ') } });
				break;
			case 'link':
				firestore.updateChannel(message.guild.id, message.channel.id, { download: { link: value[0] } });
				break;
			case 'thumbnail':
				if (!verifyURL(value[0])) return embeds.error(message.channel, `\`${value[0]}\` is not a valid URL.`);
				firestore.updateChannel(message.guild.id, message.channel.id, {
					download: { thumbnail: value[0], favicon: value[1] === 'true' }
				});
				break;
			case 'reset':
				firestore.updateChannel(message.guild.id, message.channel.id, {
					download: firestore.deleteField()
				});

				embeds.feedback(message.channel, `\`!download\` of ${message.channel} was reset.`);
				return;
			default:
				embeds.errorSyntax(
					message.channel,
					`\`${client[message.guild.id].prefix}channel config <text|link|thumbnail|reset>\``
				);
				return;
		}
		embeds.feedback(message.channel, `Updated ${args[1]} of ${message.channel}.`);
	} else {
		embeds.error(message.channel, `${message.channel} is not initialized.`);
	}
}

async function cmdInfo(_client, message) {
	const channelData = await firestore.getChannel(message.guild.id, message.channel.id);

	if (channelData) {
		embeds.feedback(message.channel, `Channel: ${message.channel}\nDeveloper: <@${channelData.dev.join('>, <@')}>`);
	} else {
		embeds.error(message.channel, `${message.channel} is not initialized.`);
	}
}

exports.subCommands = {
	init: cmdInit,
	reset: cmdReset,
	config: cmdConfig,
	info: cmdInfo
};

exports.help = {
	syntax: `channel <${Object.keys(this.subCommands).join('|')}>`,
	category: 'moderation',
	required: {
		init: 'MANAGE_ROLES',
		reset: 'MANAGE_ROLES',
		config: 'MANAGE_CHANNELS',
		info: undefined
	},
	description: 'Commands to manage and get information about channels.'
};

exports.run = (client, message, args) => {
	this.subCommands[args[0]](client, message, args);
};
