/**
 * @description
 * Configuration variables.
 */

"use strict";

const config = {};

config.queue = {
    "ATTEMPTS": 5 // How many times a job is gonna be executed after it throws an error. https://github.com/Automattic/kue#failure-attempts
    , "BACKOFF": 60 // After how much time the job is gonna be executed after an error, in seconds. https://github.com/Automattic/kue#failure-backoff
};

module.exports = config;