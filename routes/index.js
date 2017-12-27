"use strict";

const apiUrl = '/api/v1';

module.exports = function (app) {
    const home = app.controllers.home;

    // routes
    app.get('/', home.showIndex);
    app.post(apiUrl + '/queue', home.doAddToQueue);
};