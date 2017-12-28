"use strict";

const apiUrl = '/api/v1';

module.exports = function (app) {
    const home = app.controllers.home;

    // routes
    app.get('/', home.showIndex);
    app.get(apiUrl + '/failed', home.showFailed);
    app.get(apiUrl + '/active', home.showActive);
    app.post(apiUrl + '/queue', home.doAddToQueue);
};