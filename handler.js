'use strict';
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');

const url = 'https://www.dnainfo.com/new-york/about-us/our-team/editorial-team/allegra-hobbs';

const getRandomInt = (min, max) => Math.floor(Math.random() * ((max - min) + 1)) + min;

module.exports.getLatestNews = (event, context, callback) => {
  const escape = text => text.replace('\n', '').replace('\t', '');
  const parse = body => {
    const stories = []
    const $ = cheerio.load(body);
    $('.team-stories .media-heading').each(function(i, element) {
      const title = escape($(this).children('.headline').text());
      const teaser = escape($(this).children('p').text());
      const link = 'http:' + $(this).children('.headline').children('a').attr('href');
      stories.push({ title, teaser, link });
    });
    return stories;
  };
  const respond = stories => {
    const response = {
      version: '1.0',
      response: {
        outputSpeech: {
          type: 'PlainText',
          text: `Allegra has been writing about ${stories[0].title}.`,
        },
      },
    };

    callback(null, response);
  };
  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const stories = parse(body);
      respond(stories);
    }
  });
  
};
