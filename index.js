const discord = require('discord.js');
const fs = require('fs');
const embeds = require('./embeds');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const shaderChannelData = JSON.parse(fs.readFileSync('./shaderChannelData.json', 'utf8'));

const autoRoleID = '649690332174483459';
const adminRoleID = '649708528310681640';

var client = new discord.Client();

var cmdmap = {
	say: cmdSay,
	shader: cmdShader
};

function updateShaderData(data, successFunct) {
	fs.writeFile('./shaderChannelData.json', JSON.stringify(data, null, 4), (err) => {
		if (err) console.error(err);
		else if (successFunct) successFunct();
	});
}

function cmdSay(msg, arguments) {
	msg.channel.send(arguments.join(' '));
}

function cmdShader(msg, arguments, author) {
	// if (!author.guild.roles.find((r) => r.id == adminRoleID)) return;

	if (arguments[0] === 'init') {
		var channelDev = msg.mentions.users.first();
		if (channelDev) {
			shaderChannelData[msg.channel] = { shaderDevID: channelDev.id };
			updateShaderData(shaderChannelData, () => {
				embeds.feedback(msg.channel, `Successfully linked <@${shaderChannelData[msg.channel].shaderDevID}> with ${msg.channel}.`);
			});
		} else {
			embeds.errorSyntax(msg.channel, '!shader init @ShaderDeveloper');
		}
	} else if (arguments[0] === 'info') {
		embeds.feedback(msg.channel, `Channel: ${msg.channel}\nDeveloper: <@${shaderChannelData[msg.channel].shaderDevID}>`);
	} else {
		embeds.errorSyntax(msg.channel, '!shader <info|init>');
	}
}

function cmdInvalid(msg, arguments, invoke) {
	embeds.error(msg.channel, `The command "${invoke}" doesn't exist.`, 'Invalid Command!');
}

client.on('ready', () => {
	console.log(`Logged in as ${client.user.username}`);
});

client.on('message', (msg) => {
	var content = msg.content;
	var author = msg.member;
	var channel = msg.channel;
	var guild = msg.guild;

	if (author.id !== client.user.id && content.startsWith(config.prefix)) {
		var invoke = content.split(' ')[0].substr(config.prefix.length);
		var arguments = content.split(' ').slice(1);

		if (invoke in cmdmap) {
			cmdmap[invoke](msg, arguments, author);
		} else {
			cmdInvalid(msg, arguments, invoke);
		}
	}
});

client.on('guildMemberAdd', (member) => {
	var role = member.guild.roles.find((r) => r.id == autoRoleID);
	if (role) member.addRole(role);
});

client.on('channelDelete', (channel) => {
	delete shaderChannelData[channel];
	updateShaderData(shaderChannelData);
});

client.login(process.env.TOKEN);
