const request = require('request');

module.exports = {
	update: (data, successFunct) => {
		const optionsPUT = {
			url: 'https://api.jsonbin.io/b/5de15b063da40e6f299214b9',
			json: true,
			headers: {
				'secret-key': process.env.JSON,
				versioning: false
			},
			body: data
		};

		request.put(optionsPUT, (error) => {
			if (error) console.errror(error);
			else if (successFunct) successFunct();
			// Promise?
		});
	}
};
