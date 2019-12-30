const
    newsService = require('../services/newsService'),
    settingsService = require('../services/settingsService');


const receiveSettings = (req, res) => {
    settingsService.writeSettings(req.body);
    renderSettings(req, res);
}

const renderSettings = (req, res) => {

    let newsApiKey = '';
    settingsService.readSettings()
        .then(settings => {
            newsApiKey = settings['news-api-key'] || '';
            return settings;
        })
        .catch(emptyOb => {
            return emptyOb;
        })
        .then(settings => {

            res.render('settings', {
                title: 'Settings',
                heading: 'Change settings here',
                settingsActive: true,
                newsApiKey,
                category: newsService.getAllCategories().map(categoryName => {
                    return {
                        label: categoryName,
                        value: categoryName,
                        selected: settings['news-api-category'] === categoryName
                    };
                })
            })

        });
}

module.exports = {
    renderSettings,
    receiveSettings
}