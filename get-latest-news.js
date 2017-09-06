'use strict';

const cheerio = require('cheerio');
const request = require('request');
const moment = require('moment');

const getLatestNews = (callback) => {
  const url = 'https://www.dnainfo.com/new-york/about-us/our-team/editorial-team/allegra-hobbs';

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

  request(url, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const stories = parse(body);
      console.log('found stories:', stories);
      callback(stories);
    }
  });
};

module.exports = getLatestNews;