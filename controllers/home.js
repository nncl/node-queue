"use strict";

const kue = require('kue')
    , env = require('../env')
    , queue = kue.createQueue()
    , Queue = require('../modules/Queue')(queue)
    , Actions = {};

Actions.showIndex = (req, res) => res.send('Ok');

/**
 * @description
 * Add data to queue.
 *
 * @param req
 * @param res
 */

Actions.doAddToQueue = (req, res) => {

    const attempts = env.queue.ATTEMPTS ? env.queue.ATTEMPTS : 5
        , delay = env.queue.BACKOFF ? env.queue.BACKOFF : 60;

    let job = queue.create('email', {
        title: req.body.title
        , to: req.body.to
    })
        .attempts(attempts)
        .backoff({delay: delay * 1000, type: 'fixed'}) // FIXME
        .save((err) => {
            if (err) return res.status(400).json(err);
            res.send("Job " + job.id + " adicionado à fila");
        });

    // TODO Verificar se existe alguma forma de attempts ser infinito até dar certo

};

module.exports = () => {
    return Actions;
};
