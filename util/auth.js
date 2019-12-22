const firestore = require('../api/firestore.js');

// exports.getAuthorized = (client, message) => {
// 	return Boolean(message.member.roles.get(client[message.guild.id].adminRoleID));
// };

exports.getDev = async (_client, message) => {
	try {
		const channelData = await firestore.getChannel(message.guild.id, message.channel.id);
		return channelData.dev.includes(message.member.id);
	} catch (error) {
		return false;
	}
};
