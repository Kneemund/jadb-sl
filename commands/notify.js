const firestore = require('../api/firestore.js');
const embeds = require('../util/embeds.js');

function cmdAddNotify(_client, message) {
	firestore.addNotify(message.guild.id, message.channel.id, message.author.id);
	embeds.feedback(message.channel, `Added <@${message.author.id}> to <#${message.channel.id}>.`, '', 5000);
	setTimeout(() => message.delete(), 5000);
}

async function cmdRemoveNotifyAll(message) {
	const deleted = await firestore.removeAllNotify(message.guild.id, message.author.id);
	embeds.feedback(message.channel, `Removed <@${message.author.id}> from <#${deleted.join('>, <#')}>.`, '', 5000);
}

function cmdRemoveNotify(_client, message, args) {
	if (args[1] === 'all') {
		cmdRemoveNotifyAll(message);
		return;
	}

	firestore.removeNotify(message.guild.id, message.channel.id, message.author.id);
	embeds.feedback(message.channel, `Removed <@${message.author.id}> from <#${message.channel.id}>.`, '', 5000);
	setTimeout(() => message.delete(), 5000);
}

async function cmdListNotify(_client, message) {
	const list = await firestore.listNotify(message.guild.id, message.author.id);

	if (list.length === 0) {
		embeds.answer(
			message.channel,
			`<@${message.author.id}> won't receive any notifications.`,
			'NOTIFICATIONS',
			'',
			'',
			'https://img.icons8.com/flat_round/64/000000/list--v1.png'
		);
	} else {
		embeds.answer(
			message.channel,
			`<@${message.author.id}> will receive notifications about <#${list.join('>, <#')}>.`,
			'NOTIFICATIONS',
			'',
			'',
			'https://img.icons8.com/flat_round/64/000000/list--v1.png'
		);
	}
}

exports.subCommands = {
	undefined: cmdAddNotify,
	remove: cmdRemoveNotify,
	list: cmdListNotify
};

exports.help = {
	syntax: `notify [remove [all]|list]`,
	required: {
		undefined: undefined,
		remove: undefined
	},
	description:
		'Toggle getting notified via direct messages whenever the channel owner(s) make(s) an announcement or list/remove all channels.'
};

exports.run = (client, message, args) => {
	this.subCommands[args[0]](client, message, args);
};
