module.exports = (client, member) => {
	try {
		member.addRole(client.config.autoRoleID);
	} catch (err) {
		console.error('Invalid Auto-Role');
	}
};
