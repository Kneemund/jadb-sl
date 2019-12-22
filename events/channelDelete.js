const firestore = require('../api/firestore.js');

module.exports = (client, channel) => {
	// firestore.getChannel(channel.guild.id, channel.id).then(snapshot => {
	// 	if(snapshot.exists()) firestore.deleteChannel(channel.guild.id, channel.id);
	// });

	firestore.deleteChannel(channel.guild.id, channel.id);
};
