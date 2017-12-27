/**
 * @description
 * Queue Handler.
 */

const kue = require('kue')
    , Email = require('./Email');

module.exports = (queue) => {
    queue.process('email', (job, done) => {
        Email.doSendEmail(job.data.to, done);
    });

    queue.on('job complete', (id, result) => {
        kue.Job.get(id, (err, job) => {
            if (err) return;
            job.remove((err) => {
                if (err) throw err;
                console.log('Remoção do job #%d', job.id, 'finalizada');
            });
        });
    });
};