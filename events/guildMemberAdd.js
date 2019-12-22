module.exports = (client, member) => {
	try {
		if (client[member.guild.id].autoRoleID) member.addRole(client[member.guild.id].autoRoleID);
	} catch (err) {
		console.error('Invalid Auto-Role');
	}
};
