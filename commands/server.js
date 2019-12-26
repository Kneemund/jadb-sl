const embeds = require('../util/embeds.js');
const firestore = require('../api/firestore.js');

function cmdConfig(client, message) {
	const config = client[message.guild.id];
	embeds.answer(
		message.channel,
		`**Prefix**: ${config.prefix}
         **Auto-Role**: ${config.autoRoleID ? '<@&' + config.autoRoleID + '>' : 'NONE'}
         **No-Lockdown Roles**: ${config.lockdownWhitelistRoleIDs.toString()
				? '<@&' + config.lockdownWhitelistRoleIDs.join('>, <@&') + '>'
				: 'NONE'}
         **Sorted Categories**: ${config.sortCategoryIDs.toString()
				? '<#' + config.sortCategoryIDs.join('>, <#') + '>'
				: 'NONE'}`,
		'SERVER CONFIGURATION'
	);
}

function cmdPrefix(client, message, args) {
	if (!args[1])
		return embeds.errorSyntax(message.channel, client[message.guild.id].prefix + 'server prefix <PREFIX>');

	const newPrefix = args[1].trim();
	if (newPrefix.length > 2) return embeds.error(message.channel, 'The prefix must be 1-2 characters long.', 'ERROR');

	firestore.updateConfig(message.guild.id, { prefix: newPrefix });
	client[message.guild.id].prefix = newPrefix;

	embeds.feedback(message.channel, `Updated prefix to \`${client[message.guild.id].prefix}\`.`);
}

function cmdAutoRole(client, message, args) {
	if (!args[1]) {
		return embeds.errorSyntax(
			message.channel,
			client[message.guild.id].prefix + 'server autorole <@ROLE|ROLE_ID|remove>'
		);
	}

	if (args[1] === 'remove') {
		firestore.updateConfig(message.guild.id, { autoRoleID: null });
		client[message.guild.id].autoRoleID = null;

		embeds.feedback(message.channel, 'Removed auto-roles.');
	} else {
		const id = message.mentions.roles.first() ? message.mentions.roles.first().id : args[1];
		if (!message.guild.roles.get(id))
			return embeds.error(message.channel, "This role doesn't exist.", 'INVALID ROLE');

		firestore.updateConfig(message.guild.id, { autoRoleID: id });
		client[message.guild.id].autoRoleID = id;

		embeds.feedback(message.channel, `Updated auto-role to <@&${client[message.guild.id].autoRoleID}>.`);
	}
}

function cmdNoLockdownRoles(client, message, args) {
	if (!args[1]) {
		return embeds.errorSyntax(
			message.channel,
			client[message.guild.id].prefix + 'server nolockdown <@ROLES|ROLE_IDS|remove>'
		);
	}

	if (args[1] === 'remove') {
		firestore.updateConfig(message.guild.id, { lockdownWhitelistRoleIDs: [ null ] });
		client[message.guild.id].lockdownWhitelistRoleIDs = [ null ];

		embeds.feedback(message.channel, 'Removed whitelisted lockdown roles.');
	} else {
		const ids = message.mentions.roles.first() ? message.mentions.roles.keyArray() : args.slice(1);

		const isRole = id => message.guild.roles.get(id);
		if (!ids.every(isRole)) return embeds.error(message.channel, "One of the roles doesn't exist.", 'INVALID ROLE');

		firestore.updateConfig(message.guild.id, { lockdownWhitelistRoleIDs: ids });
		client[message.guild.id].lockdownWhitelistRoleIDs = ids;

		embeds.feedback(
			message.channel,
			`Updated whitelisted lockdown roles to <@&${client[message.guild.id].lockdownWhitelistRoleIDs.join(
				'>, <@&'
			)}>.`
		);
	}
}

function cmdSortCategories(client, message, args) {
	if (!args[1]) {
		return embeds.errorSyntax(
			message.channel,
			client[message.guild.id].prefix + 'server sort <CATEGORY_NAMES|CATEGORY_IDS|remove>'
		);
	}

	if (args[1] === 'remove') {
		firestore.updateConfig(message.guild.id, { sortCategoryIDs: [ null ] });
		client[message.guild.id].sortCategoryIDs = [ null ];

		embeds.feedback(message.channel, 'Removed whitelisted lockdown roles.');
	} else {
		const input = args.slice(1).map(element => element.toLowerCase());

		const categories = message.guild.channels
			.filter(
				channel =>
					channel.type === 'category' &&
					(input.includes(channel.name.toLowerCase()) || input.includes(channel.id))
			)
			.keyArray();

		if (categories.length != args.slice(1).length)
			return embeds.error(message.channel, "One of the channel categories doesn't exist.", 'INVALID CHANNEL');

		firestore.updateConfig(message.guild.id, { sortCategoryIDs: categories });
		client[message.guild.id].sortCategoryIDs = categories;

		embeds.feedback(
			message.channel,
			`Updated sorted channel categories to <#${client[message.guild.id].sortCategoryIDs.join('>, <#')}>.`
		);
	}
}

exports.subCommands = {
	config: cmdConfig,
	prefix: cmdPrefix,
	autorole: cmdAutoRole,
	nolockdown: cmdNoLockdownRoles,
	sort: cmdSortCategories
};

exports.help = {
	syntax: `server <${Object.keys(this.subCommands).join('|')}>`,
	category: 'admin',
	required: {
		config: 'ADMINISTRATOR',
		prefix: 'ADMINISTRATOR',
		autorole: 'ADMINISTRATOR',
		nolockdown: 'ADMINISTRATOR',
		sort: 'ADMINISTRATOR'
	},
	description: 'Display and edit settings of the bot.'
};

exports.run = (client, message, args) => {
	this.subCommands[args[0]](client, message, args);
};
