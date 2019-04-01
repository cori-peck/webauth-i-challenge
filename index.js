const express = require('express');
const helmet = require('helmet');

const server = express();

server.use(express.json());
server.use(helmet());

const port = process.env.PORT || 5050;
server.listen(port, () => 
console.log(`*** Server is up and running on localhost:${port} ***`)
)