const JSON = require('../util/JSON.js');

module.exports = (client, channel) => {
	if (client.dataJSON.channel[channel]) {
		delete client.dataJSON.channel[channel];
		JSON.update(client.dataJSON);
	}
};
