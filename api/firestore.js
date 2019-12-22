const admin = require('firebase-admin');
const defaultConfig = require('./defaultConfig.json');

/*
server collections won't be deleted if the bot leaves or gets removed from it
how to delete collections in case I'll ever need it in the future:
https://firebase.google.com/docs/firestore/solutions/delete-collections
*/

const account = {
	private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
	client_email: process.env.FIREBASE_CLIENT_EMAIL,
	project_id: process.env.FIREBASE_PROJECT_ID
};

admin.initializeApp({
	credential: admin.credential.cert(account)
});

const db = admin.firestore();

const emptyChannelObject = {
	dev: null,
	download: {
		text: null,
		link: null,
		thumbnail: null,
		favicon: null
	}
};

// function complete(obj) {
// 	if (obj === undefined) return emptyChannelObject;
// 	let result = { ...emptyChannelObject, ...obj };

// 	for (var prop in emptyChannelObject) {
// 		if (typeof emptyChannelObject[prop] === 'object' && emptyChannelObject[prop] !== null) {
// 			result[prop] = { ...emptyChannelObject[prop], ...obj[prop] };
// 		}
// 	}

// 	return result;
// }

module.exports = {
	emptyChannelObject,
	deleteField: () => {
		return admin.firestore.FieldValue.delete();
	},

	createChannel: (guildID, channelID, data) => {
		try {
			db.collection('servers').doc(guildID).collection('channels').doc(channelID).create(data || {});
		} catch (err) {
			console.log(err);
		}
	},

	setChannel: (guildID, channelID, data) => {
		db.collection('servers').doc(guildID).collection('channels').doc(channelID).set(data || {});
	},

	updateChannel: (guildID, channelID, data) => {
		db.collection('servers').doc(guildID).collection('channels').doc(channelID).set(data, { merge: true });
	},

	deleteChannel: (guildID, channelID) => {
		db.collection('servers').doc(guildID).collection('channels').doc(channelID).delete();
	},

	getChannel: async (guildID, channelID) => {
		const doc = await db.collection('servers').doc(guildID).collection('channels').doc(channelID).get();
		return doc.data();
	},

	initGuild: async (guildID, client) => {
		try {
			await db.collection('servers').doc(guildID).create(defaultConfig);
			client[guildID] = defaultConfig;
		} catch (err) {
			console.log(err);
		}
	},

	getConfig: async guildID => {
		const doc = await db.collection('servers').doc(guildID).get();
		return doc.data();
	},

	updateConfig: (guildID, data) => {
		db.collection('servers').doc(guildID).set(data, { merge: true });
	}
};
