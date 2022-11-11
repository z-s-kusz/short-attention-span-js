const axios = require('axios');
const corsHeader = {
  'Access-Control-Allow-Origin': process.env.PORT ? 'https://color-golf.netlify.app' : 'http://localhost:8080',
};

exports.handler = async function (event, context) {
  try {
    const axiosRes = await axios.get('https://poetrydb.org/author');
    return {
      statusCode: 200,
      headers: corsHeader,
      body: JSON.stringify(axiosRes.data),
    };
  } catch (err) {
    console.error(err);
    return {
      headers: corsHeader,
      statusCode: 500,
    };
  }
};
