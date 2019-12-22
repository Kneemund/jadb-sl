const sort = require('../util/sort.js');

module.exports = (client, oldChannel, newChannel) => {
	if (oldChannel.name === newChannel.name) return;

	const category = client.channels.find(r => r.id == newChannel.parentID && r.type == 'category');
	if (category && client[newChannel.guild.id]) {
		if (client[newChannel.guild.id].sortCategoryIDs.includes(category.id))
			setTimeout(() => sort.channels(category), 750);
		//safety timeout for other channel edits to finish
	}
};
