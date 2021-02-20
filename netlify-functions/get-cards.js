const mongoClient = require('mongodb').MongoClient;
const connectionString = process.env.COSMOS_DB_PRIMARY_CONNECTION_STRING;

exports.handler = (event, context) => {
  mongoClient.connect(connectionString, async (connectError, client) => {
    if (connectError) {
      console.error('connection error:', connectError);
      return {
        statusCode: 500,
        body: 'Error establishing mongo client connection.',
      };
    }

    try {
      const cards = await client.db('monstermon').collection('Cards').find().toArray();
      return {
        statusCode: 200,
        body: cards,
      };
    } catch (readError) {
      console.error('read error:', readError);
      return {
        statusCode: 500,
        body: 'Error reading cards documents.',
      };
    }
  });
};
