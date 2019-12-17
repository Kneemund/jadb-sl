const request = require('request-promise-native');
const fs = require('fs');

module.exports = {
	getConfig: async (client) => {
		let result = {};

		try {
			result = await fs.promises.readFile('config.json', 'utf8');
		} catch (e) {
			console.error(e);
		}

		client.config = JSON.parse(result);
	},

	getData: async (client) => {
		let result = {};

		try {
			result = await request.get({
				url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9/latest',
				json: true,
				headers: {
					'secret-key': process.env.JSON
				}
			});
		} catch (e) {
			console.error(e);
		}

		client.dataJSON = result;
	},

	update: async (data, successFunct) => {
		try {
			await request.put({
				url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9',
				json: true,
				headers: {
					'secret-key': process.env.JSON,
					versioning: false
				},
				body: data
			});
		} catch (e) {
			console.error(e);
		}

		if (successFunct) successFunct();
	}
};
