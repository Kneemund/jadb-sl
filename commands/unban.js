const embeds = require('../util/embeds.js');

exports.help = {
	syntax: 'unban <user> <reason>',
	category: 'moderation',
	required: 'BAN_MEMBERS',
	description: 'Unban a user.'
};

exports.run = (client, message, args) => {
	if (!args[0] || !args[1]) return embeds.errorSyntax(message.channel, client.config.prefix + this.help.syntax);

	const userID = args[0].replace(/[<@!>]/g, '');
	const reason = args.slice(1).join(' ');

	message.guild
		.fetchBan(userID)
		.then(ban => {
			if (ban) {
				message.guild
					.unban(userID, reason)
					.then(
						embeds.feedbackReason(
							message.channel,
							`${message.author} unbanned <@!${userID}>`,
							'UNBAN',
							reason
						)
					)
					.catch(err => {
						console.error(err);
					});
			} else {
				embeds.error(message.channel, `User <@!${userID}> not found in existing bans.`, 'ERROR');
			}
		})
		.catch(() => embeds.error(message.channel, `User <@!${userID}> not found in existing bans.`, 'ERROR'));
};
