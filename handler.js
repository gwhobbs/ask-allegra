'use strict';
const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');
const escape = require('./escape.js');

const url = 'https://www.dnainfo.com/new-york/about-us/our-team/editorial-team/allegra-hobbs';

module.exports.getLatestNews = (event, context, callback) => {
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
          text: `Allegra has been writing about ${stories[0].title}. Would you like to hear more about this?`,
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

module.exports.readMore = (event, context, callback) => {
  const url = 'https://www.dnainfo.com/new-york/20160428/new-york-city/things-do-manhattan-nyc';
  request(url, (error, response, body) => {
    const parse = body => {
      console.log(body);
      const $ = cheerio.load(body);
      let story = '';
      $('article.story').children('.entry').children('p').each(function() {
        console.log(this);
        story += ` ${escape($(this).text())}`;
      });
      return story;
    };
    const respond = story => {
      const response = {
        version: '1.0',
        response: {
          outputSpeech: {
            type: 'PlainText',
            text: `OK, this is what she said. ${story}`,
          },
        },
      };

      callback(null, response);
    }
    if (!error && response.statusCode === 200) {
      const story = parse(body);
      respond(story);
    }
  });
};