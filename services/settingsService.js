const fs = require('fs');

const readSettings = () => {

    return new Promise((resolve, reject) => {
        fs.readFile('settings.json', 'utf-8', (err, data) => {
            if (err) {
                console.log('Keine Settings-Datei gefunden ' + err);
                reject({});
            } else {
                resolve(JSON.parse(data));
            }

        });
    });
}

const writeSettings = (data => {
    fs.writeFileSync('settings.json', JSON.stringify(data));
});

module.exports = {
    readSettings,
    writeSettings
}