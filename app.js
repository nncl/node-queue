"use strict";

let express = require('express')
    , app = express()
    , load = require('express-load')
    , port = 3000;

load('controllers')
    .then('routes')
    .into(app);

app.listen(port, () => {
    console.log("App running on", port);
});