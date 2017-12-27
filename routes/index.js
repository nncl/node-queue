"use strict";

module.exports = function (app) {
    const home = app.controllers.home;
    app.get('/', home.test);
};