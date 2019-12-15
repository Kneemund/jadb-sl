module.exports = (client, member) => {
	try {
		member.addRole(client.config.autoRoleID);
	} catch (err) {
		console.log('Invalid Auto-Role');
	}
};
