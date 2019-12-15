const embeds = require('../util/embeds.js');
const auth = require('../util/auth.js');

exports.help = {
	syntax: '!unban <user> <reason>',
	category: 'moderation',
	description: 'Unban a user.'
};

exports.run = (client, message, args) => {
	if (!auth.getAuthorized(client, message)) return embeds.errorAuthorized(message.channel);
	if (!args[0] || !args[1]) return embeds.errorSyntax(message.channel, this.help.syntax);

	const userID = args[0].replace(/[<@!>]/g, '');
	const reason = args.slice(1).join(' ');

	message.guild
		.fetchBan(userID)
		.then((ban) => {
			if (ban) {
				message.guild
					.unban(userID, reason)
					.then(
						embeds.feedback(
							message.channel,
							`${message.author} unbanned <@!${userID}>\nReason: ${reason}`,
							'UNBAN'
						)
					)
					.catch((err) => {
						console.error(err);
					});
			} else {
				embeds.error(message.channel, `User <@!${userID}> not found in existing bans.`, 'ERROR');
			}
		})
		.catch(() => embeds.error(message.channel, `User <@!${userID}> not found in existing bans.`, 'ERROR'));
};
