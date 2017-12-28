"use strict";

const kue = require('kue')
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

    queue.doCreateJob(req.body).then(
        (response) => {
            res.send(response);
        }
        , (err) => {
            res.status(400).json(err);
        }
    );

};

module.exports = () => {
    return Actions;
};
