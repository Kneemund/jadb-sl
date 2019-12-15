const discord = require('discord.js');
const fs = require('fs');
const request = require('request');

// require('dotenv').config();

var client = new discord.Client();

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
client.config = config;

const optionsGET = {
	url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9/latest',
	json: true,
	headers: {
		'secret-key': process.env.JSON
	}
};

request.get(optionsGET, (error, _response, body) => {
	if (error) console.error(error);
	client.dataJSON = body;
});

fs.readdir('./events/', (err, files) => {
	if (err) return console.error(err);
	console.log('---EVENTS---');
	files.forEach((file) => {
		let eventName = file.split('.')[0];
		try {
			const event = require(`./events/${file}`);
			client.on(eventName, event.bind(null, client));
			console.log(`✅  ${eventName}`);
		} catch (err) {
			console.log(`❌  ${eventName}`);
		}
	});
});

client.commands = new discord.Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) return console.error(err);
	console.log('---COMMANDS---');
	files.forEach((file) => {
		let commandName = file.split('.')[0];
		try {
			if (!file.endsWith('.js')) return;
			let props = require(`./commands/${file}`);
			console.log(`✅  ${commandName}`);
			client.commands.set(commandName, props);
		} catch (err) {
			console.log(`❌  ${commandName}`);
		}
	});
});

client.login(process.env.TOKEN);
