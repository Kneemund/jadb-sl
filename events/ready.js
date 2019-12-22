const firestore = require('../api/firestore.js');

module.exports = client => {
	console.log(`Deployed as ${client.user.username}...`);
	client.user.setActivity('your commands', { type: 'LISTENING' });

	client.guilds.forEach(async guild => {
		client[guild.id] = await firestore.getConfig(guild.id);
		console.log(`Loaded ${guild.name}...`);
	});
};
