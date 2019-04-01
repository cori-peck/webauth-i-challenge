const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const db = require('./users/users');

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

        db
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
    let user = req.body;
    if (username && username.password) {
        db
        .findBy({ username: user.username})
        .first()
        .then(info => {
            if (info && bcrypt.compareSync(user.password, info.password)) {
                res.status(200).json({ message: `Welcome ${info.username}`})
            } else {
                res.status(401).json({ message: "Please enter valid credentials"})
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
    } else {
        res.status(400).json({ message: "Enter a username and password" })
    }
})

const port = process.env.PORT || 5050;
server.listen(port, () => 
console.log(`*** Server is up and running on localhost:${port} ***`)
)