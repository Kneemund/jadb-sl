const discord = require('discord.js');
const fs = require('fs');
const embeds = require('./embeds');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
const shaderChannelData = JSON.parse(fs.readFileSync('./shaderChannelData.json', 'utf8'));

const autoRoleID = '649690332174483459';
const adminRoleID = '649708528310681640';

var client = new discord.Client();

var cmdmap = {
	shader: cmdShader
};

function updateShaderData(data, successFunct) {
	fs.writeFile('./shaderChannelData.json', JSON.stringify(data, null, 4), (err) => {
		if (err) console.error(err);
		else if (successFunct) successFunct();
	});
}

function cmdShader(msg, arguments, author) {
	// if (!author.guild.roles.find((r) => r.id == adminRoleID)) return;

	if (arguments[0] === 'init') {
		var channelDevs = msg.mentions.users.keyArray();
		if (msg.mentions.users.first()) {
			shaderChannelData[msg.channel] = { devsID: channelDevs };
			updateShaderData(shaderChannelData, () => {
				embeds.feedback(msg.channel, `Successfully linked <@${shaderChannelData[msg.channel].devsID.join('>, <@')}> with ${msg.channel}.`);
			});
		} else {
			embeds.errorSyntax(msg.channel, '!shader init @shader_developer [...]');
		}
	} else if (arguments[0] === 'reset') {
		if (shaderChannelData[msg.channel]) {
			delete shaderChannelData[msg.channel];
			updateShaderData(shaderChannelData);
			embeds.feedback(msg.channel, `Successfully reset ${msg.channel}.`);
		} else {
			embeds.error(msg.channel, `${msg.channel} is not initialized as a shader channel.`);
		}
	} else if (arguments[0] === 'info') {
		var channelData = shaderChannelData[msg.channel];
		if (channelData) embeds.feedback(msg.channel, `Channel: ${msg.channel}\nDeveloper: <@${channelData.devsID.join('>, <@')}>`);
		else embeds.error(msg.channel, `${msg.channel} is not initialized as a shader channel.`);
	} else {
		embeds.errorSyntax(msg.channel, '!shader <info|init|reset>');
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
	// var channel = msg.channel;
	// var guild = msg.guild;

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
	if (shaderChannelData[channel]) {
		delete shaderChannelData[channel];
		updateShaderData(shaderChannelData);
	}
});

require('http').createServer().listen(3000);
client.login(process.env.token);

// const token = JSON.parse(fs.readFileSync('token.json', 'utf8'));
// client.login(token.token);
