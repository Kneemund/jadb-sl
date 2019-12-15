const sort = require('../util/sort.js');

module.exports = (client, oldChannel, newChannel) => {
	const category = client.channels.find((r) => r.id == newChannel.parentID && r.type == 'category');
	if (category) {
		if (oldChannel.name !== newChannel.name && client.config.sortCategoryIDs.includes(category.id)) {
			sort.channels(category);
		}
	}
};
