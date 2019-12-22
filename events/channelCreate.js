const sort = require('../util/sort.js');

module.exports = (client, channel) => {
	const category = client.channels.find(r => r.id == channel.parentID && r.type == 'category');
	if (category && client[channel.guild.id]) {
		if (client[channel.guild.id].sortCategoryIDs.includes(category.id)) {
			sort.channels(category);
		}
	}
};
