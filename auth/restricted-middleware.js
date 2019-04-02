const bcrypt = require('bcryptjs');

const Users = require('../users/users.js');

module.exports = (req, res, next) => {
    try {
        if(req && req.session && req.session.user) {
            next();
        } else {
            res.status(401).json({ message: "Invalid Credentials" })
        }
    } catch (error) {
        res.status(500).json({ message: "Sorry, the app is broken" })
    }
}