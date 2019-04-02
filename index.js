const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./data/dbConfig');
const Users = require('./users/users');
const session = require('express-session');
const sessionConfig = require('./auth/session-config.js');
const restricted = require('./auth/restricted-middleware.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));

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
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: 'Invalid Credentials' })
        }
    })
    .catch(error => {
        res.status(500).json(error)
    })
})


server.get('/api/logout', (req, res) => {
    if(req.session) {
        req.session.destroy(err => {
            if(err) {
                res.status(500).json({ message: 'Error logging out.'})
            } else {
                res.status(200).json({ message: "See you next time!" })
            }
        })
    } else {
        res.status(200).json({ message: "See you next time!" })
    }
})


server.get('/api/users', restricted, (req, res) => {
    Users.find()
    .then(users => {
        res.json(users);
    })
    .catch(err => res.send(err))
})



const port = process.env.PORT || 5050;
server.listen(port, () => 
console.log(`*** Server is up and running on localhost:${port} ***`)
)