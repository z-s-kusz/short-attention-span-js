// called when a new user is added via netlify identity
const mongoClient = require('mongodb').MongoClient;
const connectionString = process.env.COSMOS_DB_PRIMARY_CONNECTION_STRING;
const connectionOptions = {
  useUnifiedTopology: true,
  retryWrites: false,
};
let cachedDB = null;

function connectToDatabase() {
  if (cachedDB && mongoClient) {
    console.log('Using cached database instance.');
    return Promise.resolve(cachedDB);
  }

  console.log('Using fresh database instance.');
  return mongoClient.connect(connectionString, connectionOptions).then((client) => {
    cachedDB = client.db('monstermon');
    return cachedDB;
  }).catch((error) => {
    console.error('Error establishing db connection.', error);
    return error;
  });
}

async function getStarterDeck(db) {
  return db.collection('CardSets').findOne({ name: 'Starter Deck' }).then((cardSet) => {
    return cardSet.cardIds;
  }).catch((error) => {
    console.error('Error retrieving starter deck.', error);
    return error;
  });
}

function buildNewUserDoc(netlifyId, starterDeck) {
  return {
    name: 'test name',
    netlifyId,
    settings: {
      playSpeed: 'normal'
    },
    availableCardIds: starterDeck,
    decks: [
      { name : 'Deck 1', cardIds : starterDeck },
      { name : 'Deck 2', cardIds : [] },
      { name : 'Deck 3', cardIds : [] },
    ],
  };
}

function insertNewUser(db, newUserDoc) {
  return db.collection('Users').insertOne(newUserDoc).then((newUser) => {
    return newUser;
  }).catch((error) => {
    console.error('Error inserting user doc.', error);
    return error;
  });
}

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { user } = JSON.parse(event.body);

  try {
    const db = await connectToDatabase();
    const starterDeck = await getStarterDeck(db);
    const newUserDoc = buildNewUserDoc(user.id, starterDeck);
    await insertNewUser(db, newUserDoc);

    return {
      statusCode: 200,
      body: 'Added user to DB.',
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Error adding new user to DB.',
    };
  }
};
