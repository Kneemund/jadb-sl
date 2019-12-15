module.exports = (client) => {
	console.log(`Deployed as ${client.user.username}...`);
	client.user.setActivity(`${client.config.prefix}<command>`, { type: 'LISTENING' });
};
