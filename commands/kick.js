const embeds = require('../util/embeds.js');

exports.help = {
	syntax: 'kick <user> <reason>',
	category: 'moderation',
	required: 'KICK_MEMBERS',
	description: 'Kick a user.'
};

exports.run = (client, message, args) => {
	if (!args[0] || !args[1])
		return embeds.errorSyntax(message.channel, client[message.guild.id].prefix + this.help.syntax);

	const user = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
	const reason = args.slice(1).join(' ');

	if (!user) return embeds.error(message.channel, `User "${args[0]}" not found.`, 'ERROR');
	if (message.member.highestRole.calculatedPosition <= user.highestRole.calculatedPosition)
		return embeds.errorAuthorized(message.channel, "You can't kick a user with the same or higher permissions.");
	if (user.id === client.user.id) return embeds.error(message.channel, "I can't kick myself.", 'ERROR');

	user
		.kick(`Kicked by: ${message.author.username}#${message.author.discriminator}, Reason: ${reason}`)
		.then(embeds.feedbackReason(message.channel, `${message.author} kicked ${user}`, 'KICK', reason))
		.catch(err => {
			if (err) console.error(err);
		});
};
