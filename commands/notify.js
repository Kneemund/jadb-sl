const firestore = require('../api/firestore.js');
const embeds = require('../util/embeds.js');

function cmdAddNotify(_client, message) {
	firestore.addNotify(message.guild.id, message.channel.id, message.author.id);
	embeds.feedback(message.channel, `Added <@${message.author.id}> to <#${message.channel.id}>`, '', 5000);
	setTimeout(() => message.delete(), 5000);
}

function cmdRemoveNotify(_client, message) {
	firestore.removeNotify(message.guild.id, message.channel.id, message.author.id);
	embeds.feedback(message.channel, `Removed <@${message.author.id}> from <#${message.channel.id}>`, '', 5000);
	setTimeout(() => message.delete(), 5000);
}

exports.subCommands = {
	undefined: cmdAddNotify,
	remove: cmdRemoveNotify
};

//notify array for user AND for channel -> only 1 fetch per channel and only one fetch per user (e.g. remove all, list), 2 fetches per update

exports.help = {
	syntax: `notify [remove]`,
	category: 'user',
	required: {
		undefined: undefined,
		remove: undefined
	},
	description: 'Subscribe to a notification list that the channel author can use for announcements.'
};

exports.run = (client, message, args) => {
	this.subCommands[args[0]](client, message);
};
