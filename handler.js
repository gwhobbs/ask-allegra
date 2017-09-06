'use strict';

const getLatestNews = require('./get-latest-news.js');

module.exports.getLatestNews = (event, context, callback) => {
  const respond = stories => {
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        outputSpeech: {
          type: 'PlainText',
          text: `Allegra says: ${stories[0].title}.`,
        },
      }),
    };
    console.log(response);

    callback(null, response);
  };
  getLatestNews(respond);
  
};
