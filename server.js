const
    express = require('express'),
    expressHandlebars = require('express-handlebars'),
    bodyParser = require('body-parser'),
    routing = require('./routes'),
    session = require('express-session');




require('dotenv').config();

const port = process.env.PORT;

//<--Beispiel einer Custom Middleware, die sich in den Request/Response Ablauf hängt.
const loggerMiddleware = (req, res, next) => {
    console.log(Date(Date.now()) + ' |  Requested ' + req.url + ' from ' + req.server);
    next();
}
//-->
const sessionToLocalsCopy = (req, res, next) => {
    res.locals.isLoggedIn = req.session && req.session.isLoggedIn;
    next();
}

const server = express();
server.use(session({
    secret: process.env.SESSION_SECRET || 'sEt_seSSI0n_SecRET_NoW!',
    saveUninitialized: true,
    resave: false
}));
server.use(sessionToLocalsCopy);
server.use(express.static('public')); //bei dateiaufruf in html datei, darf der Public ordner nicht angegeben werden zb. /css/style.css obwohl die datei in public liegt
server.use(bodyParser.urlencoded({ extended: false }));
server.use(loggerMiddleware);
server.use('/', routing);

server.set('viewDir', 'views');
server.set('view engine', 'html');

server.engine('html', expressHandlebars({
    extname: 'html',
    partialsDir: 'views/partials'
}));

server.listen(port, () => {
    console.log('Express listening at port ' + port);
});
