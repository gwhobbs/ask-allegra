const getLatestNews = require('./get-latest-news.js');
const assert = require('chai').assert;

describe('getLatestNews', function () {
    it ('gets the latest news', function (done) {
        getLatestNews(news => {
            assert.typeOf(news, 'array');
            assert.isAtLeast(news.length, 3);
            assert.exists(news[0].title);
            assert.exists(news[0].teaser);
            assert.exists(news[0].link);
            done();
        });
    });
});