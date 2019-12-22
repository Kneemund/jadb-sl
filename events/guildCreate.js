const firestore = require('../api/firestore.js');

module.exports = (client, guild) => {
	console.log(`Joined ${guild.name}...`);
	firestore.initGuild(guild.id, client);
};
