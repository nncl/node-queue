"use strict";

const kue = require('kue')
    , queue = kue.createQueue()
    , Email = require('../modules/Email')
    , Actions = {};

queue.process('email', (job, done) => {
    Email.doSendEmail(job.data.to, done);
});

queue.on('job complete', (id, result) => {
    kue.Job.get(id, function (err, job) {
        if (err) return;
        job.remove(function (err) {
            if (err) throw err;
            console.log('Remoção completa do job #%d', job.id, 'finalizada');
        });
    });
});

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
