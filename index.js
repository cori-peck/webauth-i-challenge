const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const Users = require('./users/users');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.status(200).send("Intro to Authentication - Challenge I")
})


server.post('/api/register', (req, res) => {
    let user = req.body;

    const hash = bcrypt.hashSync(user.password, 8);
    user.password = hash;

        Users
        .add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(err => {
            res.status(500).json({ message: "Could not complete registration"})
        })
    }
)


server.post('/api/login', (req, res) => {
    let { username, password } = req.body;

    Users
    .findBy({ username })
    .first()
    .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

const port = process.env.PORT || 5050;
server.listen(port, () => 
console.log(`*** Server is up and running on localhost:${port} ***`)
)