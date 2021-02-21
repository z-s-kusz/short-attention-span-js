// https://docs.atlas.mongodb.com/best-practices-connecting-to-aws-lambda/
const mongoClient = require('mongodb').MongoClient;
const connectionString = process.env.COSMOS_DB_PRIMARY_CONNECTION_STRING;
const connectionOptions = {
  useUnifiedTopology: true,
};
let cachedDB = null;

// TODO extract connectToDatabase to shared folder instead of repeating it
function connectToDatabase() {
  if (cachedDB && mongoClient) {
    console.log('Using cached database instance.');
    return Promise.resolve(cachedDB);
  }

  console.log('Using fresh database instance.');
  return mongoClient.connect(connectionString, connectionOptions).then((client) => {
    return client.db('monstermon');
  }).catch((error) => {
    console.error('Error establishing db connection.', error);
    return error;
  });
}

function queryAllCards(db) {
  return db.collection('Cards').find().toArray().then((cards) => {
    return JSON.stringify(cards);
  }).catch((error) => {
    console.error('Error querying db.', error);
    return error;
  });
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  try {
    const db = await connectToDatabase();
    const cards = await queryAllCards(db);
    return {
      statusCode: 200,
      body: cards,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: 'Error getting cards.',
    };
  }
};
