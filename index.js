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

var cmdObject = {
	help: cmdHelp,
	wiki: cmdWiki,
	optifine: cmdOptifine,
	channel: cmdChannel,
	download: cmdDownload,
	purge: cmdPurge
};

////////////////////////////////////////////////////////////////////////////////////////////

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

function getAuthorized(author) {
	return Boolean(author.roles.find((element) => element.id == config.adminRoleID));
}

function getDev(msg, author) {
	try {
		return dataJSON.channel[msg.channel].devsID.includes(author.id);
	} catch (error) {
		return false;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////

function cmdHelp(msg) {
	embeds.help(msg.channel, msg.guild.iconURL);
}

function cmdWiki(msg) {
	embeds.answer(
		msg.channel,
		'https://shaders.fandom.com/wiki/Shader_Packs',
		'OFFICIAL SHADER WIKI',
		'https://shaders.fandom.com/wiki/Shader_Packs',
		true
	);
}

function cmdOptifine(msg, arguments) {
	switch (arguments[0]) {
		case 'download':
			embeds.answer(
				msg.channel,
				'https://optifine.net/downloads',
				'OPTIFINE DOWNLOAD',
				'https://optifine.net/downloads',
				true
			);
			break;
		case 'server':
			embeds.answer(
				msg.channel,
				'https://discord.gg/3mMpcwW',
				'OPTIFINE SERVER',
				'https://cdn.discordapp.com/icons/423430686880301056/a_4d188ade721bd63fc413bd7f8651a2e2.webp?size=32',
				false
			);
			break;
		default:
			embeds.errorSyntax(msg.channel, '`!optifine <download|server>`');
	}
}

function cmdChannel(msg, arguments, author) {
	const isAuthorized = getAuthorized(author);
	const isDev = getDev(msg, author);
	switch (arguments[0]) {
		case 'init':
			if (!isAuthorized) embeds.errorAuthorized(msg.channel, '');
			else if (msg.mentions.users.first()) {
				if (!dataJSON.channel[msg.channel]) dataJSON.channel[msg.channel] = {};
				var channelDevs = msg.mentions.users.keyArray();

				// delete all previous permissions
				if (dataJSON.channel[msg.channel].devsID) {
					msg.channel.permissionOverwrites
						.filter((element) => dataJSON.channel[msg.channel].devsID.includes(element.id))
						.deleteAll();
				}

				dataJSON.channel[msg.channel].devsID = channelDevs;
				updateJSON(dataJSON, () => {
					embeds.feedback(
						msg.channel,
						`Linked <@${dataJSON.channel[msg.channel].devsID.join('>, <@')}> with ${msg.channel}.`
					);
				});

				// set permissions
				channelDevs.forEach((element) => {
					msg.channel.overwritePermissions(element, {
						MANAGE_CHANNELS: true
					});
				});
			} else {
				embeds.errorSyntax(msg.channel, '`!channel init @developer [...]`');
			}
			break;
		case 'reset':
			if (!isAuthorized) embeds.errorAuthorized(msg.channel, '');
			else if (dataJSON.channel[msg.channel]) {
				// delete all permissions
				if (dataJSON.channel[msg.channel].devsID) {
					msg.channel.permissionOverwrites
						.filter((element) => dataJSON.channel[msg.channel].devsID.includes(element.id))
						.deleteAll();
				}

				delete dataJSON.channel[msg.channel];
				updateJSON(dataJSON, () => {
					embeds.feedback(msg.channel, `${msg.channel} was reset.`);
				});
			} else {
				embeds.error(msg.channel, `${msg.channel} is not initialized.`);
			}
			break;
		case 'config':
			if (!isDev && !isAuthorized) embeds.errorAuthorized(msg.channel, '');
			else if (!dataJSON.channel[msg.channel]) embeds.error(msg.channel, `${msg.channel} is not initialized.`);
			else {
				var value = arguments.slice(2);
				if (!dataJSON.channel[msg.channel].download) dataJSON.channel[msg.channel].download = {};
				switch (arguments[1]) {
					case 'text':
						dataJSON.channel[msg.channel].download.text = value.join(' ');
						break;
					case 'link':
						dataJSON.channel[msg.channel].download.link = value[0];
						break;
					case 'thumbnail':
						dataJSON.channel[msg.channel].download.thumbnail = [ value[0], value[1] ];
						break;
					case 'reset':
						dataJSON.channel[msg.channel].download = {};
						updateJSON(dataJSON, () => {
							embeds.feedback(msg.channel, `\`!download\` of ${msg.channel} was reset.`);
						});
						return;
					default:
						embeds.errorSyntax(msg.channel, '`!channel config <text|link|thumbnail>`');
						return;
				}

				updateJSON(dataJSON, () => {
					embeds.feedback(msg.channel, `The ${arguments[1]} of ${msg.channel} was updated.`);
				});
			}
			break;
		case 'info':
			var channelData = dataJSON.channel[msg.channel];
			if (channelData) {
				embeds.feedback(
					msg.channel,
					`Channel: ${msg.channel}\nDeveloper: <@${channelData.devsID.join('>, <@')}>`
				);
			} else {
				embeds.error(msg.channel, `${msg.channel} is not initialized.`);
			}
			break;
		default:
			embeds.errorSyntax(msg.channel, '`!channel <info|config|init|reset>`');
	}
}

function cmdDownload(msg) {
	try {
		if (!dataJSON.channel[msg.channel]) {
			embeds.error(msg.channel, `${msg.channel} is not initialized.`);
			return;
		}

		var values = dataJSON.channel[msg.channel].download;
		if ((values.text == '' || !values.text) && (values.link == '' || !values.link)) throw Error;
		if (!values.text) values.text = '';
		if (!values.link) values.link = '';
		if (!values.thumbnail) values.thumbnail = [ '', '' ];

		embeds.answer(
			msg.channel,
			`${values.text}\n${values.link}`,
			'DOWNLOAD',
			values.thumbnail[0],
			values.thumbnail[1] === 'true' ? true : false
		);
	} catch (error) {
		embeds.error(msg.channel, '`!download` was not configured by the developer(s).');
	}
}

function cmdPurge(msg, arguments, author) {
	if (!getAuthorized(author) && !getDev(msg, author)) return embeds.errorAuthorized(msg.channel, '');

	if (isNaN(arguments[0]) || arguments[0] < 1 || arguments[0] != Math.floor(arguments[0])) {
		return embeds.errorSyntax(msg.channel, '`!purge <amount>`');
	}

	if (arguments[0] > 100) {
		return embeds.error(msg.channel, 'You can delete a maximum of 100 messages at once.', 'ERROR');
	}

	msg.channel
		.bulkDelete(arguments[0])
		.then((messages) => {
			embeds.feedback(msg.channel, `Deleted ${messages.size}/${arguments[0]} messages.`, '', 5000);
		})
		.catch((err) => {
			if (err) console.error(err);
		});
}

function cmdInvalid(msg, _arguments, invoke) {
	embeds.error(msg.channel, `The command \`!${invoke}\` doesn't exist.`, 'INVALID COMMAND');
}

////////////////////////////////////////////////////////////////////////////////////////////

function sortChannels(category) {
	var sorted = category.children.keyArray();
	sorted.sort((a, b) => {
		var nameA = category.children.find((r) => r.id == a).name;
		var nameB = category.children.find((r) => r.id == b).name;

		if (nameA < nameB) return -1;
		if (nameA > nameB) return 1;
		return 0;
	});

	sorted.forEach((element, i) => {
		category.children.find((r) => r.id == element).edit({ position: i + 1 });
	});

	// https://discord.js.org/#/docs/main/stable/class/Guild?scrollTo=setChannelPositions
}

function msgNoU(content, channel, author) {
	if (author.id !== client.user.id && content.toLowerCase().includes('no u')) {
		channel.send('no u');
	}
}

////////////////////////////////////////////////////////////////////////////////////////////

client.on('ready', () => {
	console.log(`Deployed as ${client.user.username}...`);
	client.user.setActivity(`${config.prefix}<command>`, { type: 'LISTENING' });
});

client.on('message', (msg) => {
	var content = msg.content;
	var author = msg.member;

	if (!author) return;

	msgNoU(content, msg.channel, author);

	if (author.id !== client.user.id && content.startsWith(config.prefix)) {
		var invoke = content.split(' ')[0].substr(config.prefix.length);
		var arguments = content.split(' ').slice(1);

		if (invoke in cmdObject) {
			cmdObject[invoke](msg, arguments, author);
		} else {
			cmdInvalid(msg, arguments, invoke);
		}
	}
});

// auto roles
// client.on('guildMemberAdd', (member) => {
// 	var role = member.guild.roles.find((r) => r.id == config.autoRoleID);
// 	if (role) member.addRole(role);
// });

// remove channel from json object
client.on('channelDelete', (channel) => {
	if (dataJSON.channel[channel]) {
		delete dataJSON.channel[channel];
		updateJSON(dataJSON);
	}
});

// automatic channel sorting
client.on('channelUpdate', (oldChannel, newChannel) => {
	const category = client.channels.find((r) => r.id == newChannel.parentID && r.type == 'category');
	if (category) {
		if (oldChannel.name !== newChannel.name && config.sortCategoryIDs.includes(category.id)) {
			sortChannels(category);
		}
	}
});

// automatic channel sorting
client.on('channelCreate', (channel) => {
	const category = client.channels.find((r) => r.id == channel.parentID && r.type == 'category');
	if (category) {
		if (config.sortCategoryIDs.includes(category.id)) {
			sortChannels(category);
		}
	}
});

client.login(process.env.TOKEN);
