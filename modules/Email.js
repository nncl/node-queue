"use strict";

const Actions = {};

/**
 * @description
 * Simulação de método assíncrono.
 *
 * @param address
 * @param done
 * @returns {*}
 */

Actions.doSendEmail = (address, done) => {
    if (!address) {
        return done(new Error('invalid to address'));
    }

    console.log('Sending e-mail...', address);

    setTimeout(function () {
        console.log('E-mail has been sent successfully');
        done();
    }, 2000);
};

module.exports = Actions;