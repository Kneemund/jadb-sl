const admin = require('firebase-admin');
const defaultConfig = require('./defaultConfig.json');

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
	},

	addNotify: (guildID, channelID, userID) => {
		db.collection('servers').doc(guildID).collection('channels').doc(channelID).set(
			{
				notify: admin.firestore.FieldValue.arrayUnion(userID)
			},
			{ merge: true }
		);
	},

	removeNotify: (guildID, channelID, userID) => {
		db.collection('servers').doc(guildID).collection('channels').doc(channelID).set(
			{
				notify: admin.firestore.FieldValue.arrayRemove(userID)
			},
			{ merge: true }
		);
	},

	removeAllNotify: async (guildID, userID) => {
		const docs = await db
			.collection('servers')
			.doc(guildID)
			.collection('channels')
			.where('notify', 'array-contains', userID)
			.get();

		let deleted = [];
		docs.forEach(doc => {
			db.collection('servers').doc(guildID).collection('channels').doc(doc.id).set(
				{
					notify: admin.firestore.FieldValue.arrayRemove(userID)
				},
				{ merge: true }
			);

			deleted.push(doc.id);
		});

		return deleted;
	},

	listNotify: async (guildID, userID) => {
		const docs = await db
			.collection('servers')
			.doc(guildID)
			.collection('channels')
			.where('notify', 'array-contains', userID)
			.get();

		let list = [];
		docs.forEach(doc => {
			list.push(doc.id);
		});

		return list;
	}
};
