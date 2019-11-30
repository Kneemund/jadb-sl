const discord = require('discord.js');
const fs = require('fs');
const embeds = require('./embeds');
const request = require('request');

// require('dotenv').config();

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

const optionsGET = {
	url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9/latest',
	json: true,
	headers: {
		'secret-key': process.env.JSON
	}
};

var dataJSON;
request.get(optionsGET, (error, _response, body) => {
	if (error) console.error(error);
	dataJSON = body;
});

var client = new discord.Client();

var cmdmap = {
	shader: cmdShader
};

function updateJSON(data, successFunct) {
	const optionsPUT = {
		url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9',
		json: true,
		headers: {
			'secret-key': process.env.JSON,
			versioning: false
		},
		body: data
	};

	request.put(optionsPUT, (error, _response, _body) => {
		if (error) console.errror(error);
		else if (successFunct) successFunct();
	});
}

function cmdShader(msg, arguments, author) {
	const isAuthorized = Boolean(author.roles.find((r) => r.id == config.adminRoleID));
	switch (arguments[0]) {
		case 'init':
			if (!isAuthorized) embeds.errorAuthorized(msg.channel, '');
			else if (msg.mentions.users.first()) {
				var channelDevs = msg.mentions.users.keyArray();
				dataJSON.shader[msg.channel] = { devsID: channelDevs };
				updateJSON(dataJSON, () => {
					embeds.feedback(msg.channel, `Successfully linked <@${dataJSON.shader[msg.channel].devsID.join('>, <@')}> with ${msg.channel}.`);
				});
			} else {
				embeds.errorSyntax(msg.channel, '!shader init @shader_developer [...]');
			}
			break;
		case 'reset':
			if (!isAuthorized) embeds.errorAuthorized(msg.channel, '');
			else if (dataJSON.shader[msg.channel]) {
				delete dataJSON.shader[msg.channel];
				updateJSON(dataJSON);
				embeds.feedback(msg.channel, `Successfully reset ${msg.channel}.`);
			} else {
				embeds.error(msg.channel, `${msg.channel} is not initialized as a shader channel.`);
			}
			break;
		case 'info':
			var channelData = dataJSON.shader[msg.channel];
			if (channelData) {
				embeds.feedback(msg.channel, `Channel: ${msg.channel}\nDeveloper: <@${channelData.devsID.join('>, <@')}>`);
			} else {
				embeds.error(msg.channel, `${msg.channel} is not initialized as a shader channel.`);
			}
			break;
		default:
			embeds.errorSyntax(msg.channel, '!shader <info|init|reset>');
	}
}

function cmdInvalid(msg, arguments, invoke) {
	embeds.error(msg.channel, `The command "${invoke}" doesn't exist.`, 'Invalid Command');
}

client.on('ready', () => {
	console.log(`Deployed as ${client.user.username}...`);
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
	var role = member.guild.roles.find((r) => r.id == config.autoRoleID);
	if (role) member.addRole(role);
});

client.on('channelDelete', (channel) => {
	if (dataJSON.shader[channel]) {
		delete dataJSON.shader[channel];
		updateJSON(dataJSON);
	}
});

client.login(process.env.TOKEN);
