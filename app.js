var debug = require('debug')('app');
debug("started");

const http = require('http');

//const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

/**
 * Initialise EJS template engine. 
 * Note EJS is an Express compliant template engine.
 */
var ejs = require("ejs");
var express = require("express");
var session = require('express-session');
const app = express();


// init session 
// unique id for session maintained by default in memory on the HTTP server
/*if (process.env.PORT) { // heroku !!
    // TODO
    debug("using redis :)");
} else { */ // localhost
    app.use(session({
        proxy: false,
        secret: 'sfmc-search-replace-1234',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }));

    // no worker container
    debug("not using heroku!!!");
//}



app.set("views", "./views") // where the template files are located
app.set("view engine", "ejs"); // tells Express that EJS is being used
// status assets
app.use(express.static("public")); // specify static assets
app.use(express.json());
app.use('/salesforce-ux', express.static('node_modules/@salesforce-ux/design-system/assets/'))
app.use('/blocksdk', express.static('node_modules/blocksdk/'))
app.use('/jquery', express.static('node_modules/jquery/dist/'))

// route handlers
const routes = require("./routes.js")(app);

// initialise server
const fs = require('fs');

var server;
if (process.env.PORT) { // heroku !!
	server = require('http').createServer(app);
} else {  // localhost !!
	const fs = require('fs');
	server = require('https').createServer({
	    key: fs.readFileSync('./key.pem'),
	    cert: fs.readFileSync('./cert.pem'),
	    passphrase: 'hello'
	}, app);
}
server.listen(port, () => {
    debug("server listening at port " + port + "!");
});