const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
module.exports =
    function verifysession(req, res, next) {
        const authorization = req.headers.authorization.split(' ')[1];
        if (authorization) {
            try {
                result = jwt.verify(authorization, process.env.secret_key);
                next();
            } catch (err) {
                console.log(err);
                return res.status(401).send({
                    error: 'Failed to authenticate token.'
                });
            }
        } else {
            return res
                .status(403)
                .send({
                    error: `Authentication error. Token required.`
                });
        }
    }