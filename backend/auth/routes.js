const express = require('express');
const app = express();
app.use(express.json());
const bcrypt = require('bcrypt');
const client = require('../db');
const redis = require('redis');
require('dotenv').config()
const __prod__ = require('../constants');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

// if in prod we use the redis container 
const redisClient = __prod__? redis.createClient(process.env.REDIS_URL) : redis.createClient();

/* creates a cookie in the users browser along with
 * their user id and creates a session in express
 * to maintain the user in the browser using redis.
 */
module.exports = app => {
    // uses express session with connect redis to store the session
    // id into the cookie on the users browser
    app.use(
        session({
            name: 'cooks',
            store: new RedisStore({
                client: redisClient,
                disableTouch: true
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 7, // one week
                httpOnly: true,
                secure: false,
                domain: 'localhost',
                sameSite: 'lax'
            },
            secret: 'foo',
            resave: true,
            proxy: true,
            saveUninitialized: false
        })
    )

    app.post('/auth/register', (req, res) => {
        client.query('select * from users where email=$1', [req.body.email], (_, result) => {
            if (result.rowCount > 0) 
                return res.status(400).send("Email is taken");
            else {
                console.log(req.body);
                bcrypt.hash(req.body.password, 10).then(hashedPassword => {
                    client.query('insert into users(name, email, password, type) values($1, $2, $3, $4) returning *', [req.body.name, req.body.email, hashedPassword, req.body.type], (e, re) => {
                        if (e) throw e;
                        req.session.userId = re.rows[0].uid;
                        res.status(200).send("Authorized");
                    });
                });
            }
        });
    });
    
    app.post('/auth/login', (req, res) => {
        client.query('select * from users where email=$1', [req.body.email], (err, result) => {
            if (err) throw err;
            if (result.rowCount < 1)
                return res.status(400).send("Bad Email");
            else {
                bcrypt.compare(req.body.password, result.rows[0].password).then(response => {
                    if (!response) return res.status(400).send("Bad Password");
                    req.session.userId = result.rows[0].uid;
                    return res.status(200).send("Authorized");
                });
            }
        });
    });

    // need to test this
    app.get('/auth/logout', (req, res) => {
        req.session = undefined;
        res.clearCookie('cooks', { httpOnly: true, sameSite: 'lax', domain: 'localhost' })
        res.redirect('/');
    });
}
