const { Attachment } = require('discord.js');
const embeds = require('../util/embeds.js');

function messageTriggers(message) {
	if (message.content.toLowerCase().includes('no u ') || message.content.toLowerCase().includes('no u ') === 'no u')
		message.channel.send('no u');
	if (message.content.toLowerCase().split(' ').includes('rip'))
		message.channel.send(new Attachment('https://i.postimg.cc/mk2yHfRV/rip.jpg'));
}

module.exports = (client, message) => {
	if (message.author.bot) return;
	if (message.channel.type == 'dm') return;

	messageTriggers(message);

	if (!message.content.startsWith(client[message.guild.id].prefix)) return;

	const args = message.content.slice(client[message.guild.id].prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	const cmd = client.commands.get(command);

	if (!cmd)
		return embeds.error(
			message.channel,
			`The command \`${client[message.guild.id].prefix}${command}\` doesn't exist.`,
			'INVALID COMMAND'
		);

	if (cmd.subCommands) {
		if (!(args[0] in cmd.subCommands)) {
			return embeds.errorSyntax(message.channel, client[message.guild.id].prefix + cmd.help.syntax);
		}

		if (cmd.help.required[args[0]]) {
			if (!message.member.permissionsIn(message.channel).has(cmd.help.required[args[0]])) {
				return embeds.errorAuthorized(message.channel, '', cmd.help.required[args[0]]);
			}
		}
	} else {
		if (cmd.help.required) {
			if (!message.member.permissionsIn(message.channel).has(cmd.help.required)) {
				return embeds.errorAuthorized(message.channel, '', cmd.help.required);
			}
		}
	}

	cmd.run(client, message, args);
};
