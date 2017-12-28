/**
 * @description
 * Queue Handler.
 */

const kue = require('kue')
    , Email = require('./Email');

module.exports = (queue) => {
    queue.process('email', (job, done) => {
        console.log('Vamos enviar o email. Job', job.id);
        const addressee = job.id >= 100 && job.id <= 200 ? null : job.data.to; // Simulando erro
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
         * The quantity of shots is defined by attempts and backoffs on env file.
         */

        .on('job failed', (errorMessage) => {
            console.error('JOB FAILED', errorMessage);
            // TODO Verificar se ele ainda está na fila
        })

        .on('error', (err) => {
            console.error('QUEUE ERROR', err);
        })

    ;
};