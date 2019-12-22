const embeds = require('../util/embeds.js');

function cmdMain(client, message) {
	var whitelistRoles = message.member.guild.roles.filter(role =>
		client[message.guild.id].lockdownWhitelistRoleIDs.includes(role.id)
	);

	whitelistRoles.forEach(whitelistRole => {
		var currOverwrites = message.channel.permissionOverwrites.get(whitelistRole.id);

		if (!currOverwrites) {
			message.channel.overwritePermissions(whitelistRole, {
				SEND_MESSAGES: true
			});
		} else if ((currOverwrites.deny & 0x800) != 0x800 && (currOverwrites.allow & 0x800) != 0x800) {
			message.channel.overwritePermissions(whitelistRole, {
				SEND_MESSAGES: true
			});
		}
	});

	message.channel.overwritePermissions(message.guild.id, {
		SEND_MESSAGES: false
	});

	embeds.feedback(message.channel, `${message.channel} was locked.`);
	if (!message.channel.name.startsWith('⛔-')) return message.channel.setName('⛔-' + message.channel.name);
}

function cmdRemove(client, message) {
	var whitelistRoles = message.member.guild.roles.filter(role =>
		client[message.guild.id].lockdownWhitelistRoleIDs.includes(role.id)
	);

	whitelistRoles.forEach(whitelistRole => {
		var currOverwrites = message.channel.permissionOverwrites.get(whitelistRole.id);

		if (currOverwrites) {
			if ((currOverwrites.deny & 0x800) != 0x800 && (currOverwrites.allow & 0x800) == 0x800) {
				message.channel.overwritePermissions(whitelistRole, {
					SEND_MESSAGES: null
				});
			}

			if (
				(currOverwrites.type === 'role' && (currOverwrites.allow === 0 && currOverwrites.deny === 0)) ||
				(currOverwrites.allow == 0x800 && currOverwrites.deny === 0)
			) {
				currOverwrites.delete();
			}
		}
	});

	message.channel.overwritePermissions(message.guild.id, {
		SEND_MESSAGES: null
	});

	embeds.feedback(message.channel, `${message.channel} was unlocked.`);
	if (message.channel.name.startsWith('⛔-')) return message.channel.setName(message.channel.name.slice(2));
}

exports.subCommands = {
	undefined: cmdMain,
	remove: cmdRemove
};

exports.help = {
	syntax: 'lockdown [remove]',
	category: 'moderation',
	required: 'MANAGE_CHANNELS',
	description: 'Locks the current channel for every role that is not whitelisted.'
};

exports.run = (client, message, args) => {
	this.subCommands[args[0]](client, message);
};
