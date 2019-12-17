const discord = require('discord.js');
const fs = require('fs');
const JSONHandler = require('./util/JSON.js');

require('dotenv').config();

var client = new discord.Client({
	disableEveryone: true,
	disabledEvents: [ 'TYPING_START' ]
});

// client.config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
// ASYNC
JSONHandler.getConfig(client);
JSONHandler.getData(client);

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	let loadSuccess = [];
	let loadFail = [];
	files.forEach(file => {
		let eventName = file.split('.')[0];
		try {
			const event = require(`./events/${file}`);
			client.on(eventName, event.bind(null, client));
			loadSuccess.push(eventName);
		} catch (err) {
			loadFail.push(eventName);
		}
	});

	console.log('---EVENTS---');
	console.log(`✅  ${loadSuccess.join(', ') || 'NONE'}\n❌  ${loadFail.join(', ') || 'NONE'}`);
});

client.commands = new discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	let loadFail = [];
	files.forEach(file => {
		let commandName = file.split('.')[0];
		try {
			if (!file.endsWith('.js')) return;
			let props = require(`./commands/${file}`);
			client.commands.set(commandName, props);
		} catch (err) {
			loadFail.push(commandName);
		}
	});

	console.log('---COMMANDS---');
	console.log(`✅  ${client.commands.keyArray().join(', ') || 'NONE'}\n❌  ${loadFail.join(', ') || 'NONE'}`);
});

client.login(process.env.TOKEN);
