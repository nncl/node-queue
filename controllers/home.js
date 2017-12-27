"use strict";

let HomeController = {
    test: (req, res) => {
        res.send('Ok');
    }
};

module.exports = () => {
    return HomeController;
};