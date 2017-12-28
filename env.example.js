"use strict";

const config = {};

config.queue = {
    "ATTEMPTS": 5 // How many times this job is gonna be executed after throws an error. https://github.com/Automattic/kue#failure-attempts
    , "BACKOFF": 5 // After how much time the job is gonna be executed after an error. https://github.com/Automattic/kue#failure-backoff
};

module.exports = config;