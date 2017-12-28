/**
 * @description
 * Queue Handler.
 */

const kue = require('kue')
    , Email = require('./Email')
    , env = require('../env')
    , Q = require('q');

module.exports = (queue) => {

    queue.doCreateJob = (data) => {
        let d = Q.defer();

        const attempts = env.queue.ATTEMPTS ? env.queue.ATTEMPTS : 5
            , delay = env.queue.BACKOFF ? env.queue.BACKOFF : 60;

        let job = queue.create('email', {
            title: data.title
            , to: data.to
        })
            .attempts(attempts)
            .backoff(true)
            .save((err) => {
                if (err) return d.reject(err);
                d.resolve("Job " + job.id + " adicionado à fila");
            });

        return d.promise;
    };

    queue.process('email', (job, done) => {
        console.log('Vamos enviar o email.', job.data.title, job.data.to, 'Job', job.id, '. Tentativa', job.toJSON().attempts.made + 1, 'de', job.toJSON().attempts.max);
        const addressee = job.id >= 100 && job.id <= 300 ? null : job.data.to; // Simulando erro
        console.log('addressee', addressee);
        Email.doSendEmail(addressee, done);
    });

    queue
        .on('job complete', (id, result) => {
            kue.Job.get(id, (err, job) => {
                if (err) return;
                job.remove((err) => {
                    if (err) throw err;
                    console.log('Remoção do job #%d', job.id, 'finalizada');
                });
            });
        })

        /*
         * Gets here after all attempts and backoffs.
         * The quantity of tries is defined by attempts and backoffs on env file.
         */

        .on('job failed', (id) => {
            console.error('JOB FAILED', id);

            kue.Job.get(id, (err, job) => {
                if (err) return;

                // Criar um novo job a partir daqui, dessa forma acontecerá até dar certo
                const data = job.toJSON().data;
                queue.doCreateJob(data);
            });

        })

        .on('error', (err) => {
            console.error('QUEUE ERROR', err);
        })

    ;
};