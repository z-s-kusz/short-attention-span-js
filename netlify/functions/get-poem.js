const axios = require('axios');
// TODO change or remove prod header to allow easy app name changing
const corsHeader = {
  'Access-Control-Allow-Origin': process.env.PORT ? 'https://color-golf.netlify.app' : 'http://localhost:8080',
};

function trimToCharLimit(string) {
  const maxLength = 50;
  if (string.length > maxLength) return string.substring(0, maxLength);
  return string;
}

exports.handler = async function (event, context) {
  if (!event.multiValueQueryStringParameters.author || !event.multiValueQueryStringParameters.title) {
    return {
      headers: corsHeader,
      statusCode: 400,
    };
  }

  try {
    // is this a thing? why is it an array of 1 instead of just accessed by key directly?
    // thinking this might change and break at some point
    const authorName = event.multiValueQueryStringParameters.author[0];
    const titleName = trimToCharLimit(event.multiValueQueryStringParameters.title[0]);
    const axiosRes = await axios.get(`https://poetrydb.org/title/${titleName}`);

    // if multiple authors used the same title the poetry DB returns all poems so we must filter the author
    const poemsData = axiosRes.data.filter(poem => {
      return poem.author === authorName;
    });
  
    return {
      statusCode: 200,
      headers: corsHeader,
      body: JSON.stringify(poemsData),
    };
  } catch (err) {
    console.error(err);
    return {
      headers: corsHeader,
      statusCode: 500,
    };
  }
};
