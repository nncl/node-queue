"use strict";

let express = require('express')
    , app = express()
    , bodyParser = require('body-parser')
    , load = require('express-load')
    , port = process.env.PORT ? process.env.PORT : 3000;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

load('controllers')
    .then('routes')
    .into(app);

app.listen(port, () => {
    console.log("App running on", port);
});
