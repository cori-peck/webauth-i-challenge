const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const configuredKnex = require('../data/dbConfig.js');


module.exports = {
    name: 'chocolate-chip',
    secret: 'midnight snack',
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 15,
        },
    resave: false,
    saveUninitialized: false,
    store: new KnexSessionStore({
        knex: configuredKnex,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    })
}