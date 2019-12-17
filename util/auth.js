// exports.getAuthorized = (client, message) => {
// 	return Boolean(message.member.roles.get(client.config.adminRoleID));
// };

exports.getDev = (client, message) => {
	try {
		return client.dataJSON.channel[message.channel].devsID.includes(message.member.id);
	} catch (error) {
		return false;
	}
};
