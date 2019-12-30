const newsService = require('../services/newsService');


const renderHome = (req, res) => {

    newsService.getNews()
        .then(news => {
            res.render('home', {
                title: 'News',
                heading: 'Welcome to your News-Dashboard',
                homeActive: true,
                message: news.message,
                articles: news.articles
            });
        });
}

module.exports = {
    renderHome
}
