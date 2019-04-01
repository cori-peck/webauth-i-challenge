const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const knexConfig = require('./knexfile')

const server = express();
const db = knex(knexConfig.development);

server.use(express.json());
server.use(helmet());

const port = process.env.PORT || 5050;
server.listen(port, () => 
console.log(`*** Server is up and running on localhost:${port} ***`)
)