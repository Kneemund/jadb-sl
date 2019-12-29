const embeds = require('../util/embeds.js');

exports.help = {
	syntax: 'purge <AMOUNT>',
	required: 'MANAGE_MESSAGES',
	description: 'Delete up to 100 messages at once that are less than 2 weeks old.'
};

exports.run = async (client, message, args) => {
	if (isNaN(args[0]) || args[0] < 1 || args[0] != Math.floor(args[0])) {
		return embeds.errorSyntax(message.channel, client[message.guild.id].prefix + this.help.syntax);
	}

	if (args[0] > 100) {
		return embeds.error(message.channel, 'You can delete a maximum of 100 messages at once.', 'ERROR');
	}

	const deleted = await message.channel.bulkDelete(args[0], true);
	embeds.feedback(message.channel, `Deleted \`${deleted.size}\`/\`${args[0]}\` messages.`, '', 5000);

	// var deleted = 0;
	// while (deleted < args[0]) {
	// const messages = await message.channel.bulkDelete(args[0] - deleted > 100 ? 100 : args[0] - deleted, true);
	// deleted += messages.size;
	// }
};
