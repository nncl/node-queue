"use strict";

const kue = require('kue')
    , queue = kue.createQueue()
    , Queue = require('../modules/Queue')(queue)
    , Actions = {};

/**
 * @description
 * Add data to queue.
 *
 * @param req
 * @param res
 */

Actions.doAddToQueue = (req, res) => {

    let job = queue.create('email', {
        title: req.body.title
        , to: req.body.to

    }).save((err) => {
        if (err) return res.status(400).json(err);
        res.send("Job " + job.id + " adicionado à fila");
    });

};

module.exports = () => {
    return Actions;
};
