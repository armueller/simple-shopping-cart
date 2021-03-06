const { MongoClient } = require('mongodb');
const { MONGO_USER, MONGO_PASS } = process.env;

/**
 * @type { MongoClient }
 */
let client;

const ATLAS_URI = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0-fbnpg.mongodb.net/test?retryWrites=true&w=majority`;

async function mongoConnect() {
    if (client) {
        await client.close();
    }
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    client = await MongoClient.connect(ATLAS_URI, options);
}
exports.mongoConnect = mongoConnect;

/**
 * 
 * @param {string} dbName 
 */
function getDb(dbName) {
    if (client) {
        return client.db(dbName);
    }
    throw new Error('MongoDB not connected!');
}
exports.getDb = getDb;

