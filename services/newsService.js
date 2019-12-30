const
    newsapi = require('newsapi-wrapper'),
    settingsService = require('./settingsService');
require('dotenv').config();


const getNews = () => {

    let articles = [];
    let message = '';

    return settingsService.readSettings()
        .then((settings) => {
            return settings;
        })
        .catch(emptyOb => {
            return emptyOb;
        })
        .then((settings) => {
            return newsapi
                .setApiKey(settings['news-api-key'] || 'x')
                .setCategory(settings['news-api-category'] || 'general')
                .send()
                .then(response => {
                    articles = response.articles;
                })
                .catch(err => {
                    console.log('Error at GetNews ' + err);
                    message = 'Error while getting the news! ' + err;
                })
                .then(() => {
                    return {
                        articles,
                        message
                    };
                });
        })


};

const getAllCategories = () => {

    return newsapi.getCategories();
}

module.exports = {
    getNews,
    getAllCategories
}


