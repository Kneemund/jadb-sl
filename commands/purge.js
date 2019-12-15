const embeds = require('../util/embeds.js');
const auth = require('../util/auth.js');

exports.help = {
	syntax: '!purge <amount>',
	category: 'moderation',
	description: 'Delete up to 100 messages at a time that are less than 2 weeks old.'
};

exports.run = (client, message, args) => {
	if (!auth.getAuthorized(client, message)) return embeds.errorAuthorized(message.channel);

	if (isNaN(args[0]) || args[0] < 1 || args[0] != Math.floor(args[0])) {
		return embeds.errorSyntax(message.channel, this.syntax);
	}

	if (args[0] > 100) {
		return embeds.error(message.channel, 'You can delete a maximum of 100 messages at once.', 'ERROR');
	}

	message.channel
		.bulkDelete(args[0])
		.then((messages) => {
			embeds.feedback(message.channel, `Deleted \`${messages.size}\`/\`${args[0]}\` messages.`, '', 5000);
		})
		.catch((err) => {
			if (err) console.error(err);
		});
};
