"use strict";

const kue = require('kue')
    , env = require('../env')
    , queue = kue.createQueue()
    , Queue = require('../modules/Queue')(queue) // It's important to be instantiated like this
    , Actions = {};

Actions.showIndex = (req, res) => res.send('Ok');

/**
 * @description
 * Display failed jobs' information.
 *
 * @param req
 * @param res
 */

Actions.showFailed = (req, res) => {
    queue.failed((err, jobs) => {
        res.json({err: err, jobs: jobs, total: jobs.length});
    });
};

/**
 * @description
 * Display active jobs' information.
 *
 * @param req
 * @param res
 */

Actions.showActive = (req, res) => {
    queue.active((err, jobs) => {
        res.json({err: err, jobs: jobs, total: jobs.length});
    });
};

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
        .backoff({delay: delay * 1000, type: 'fixed'})
        .save((err) => {
            if (err) return res.status(400).json(err);
            res.send("Job " + job.id + " adicionado à fila");
        });

};

module.exports = () => {
    return Actions;
};
