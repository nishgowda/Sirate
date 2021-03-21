const express = require('express');
const isAuthenticated = require('../auth/verify');
const app = express();
const client = require('../db')
app.use(express.json());

//get all user 
module.exports = app => {
    app.get('/api/users', isAuthenticated, (req, res) => {
        client.query('select * from users', (err, result) => {
            if (err) return res.status(400).send(err)
            return res.status(200).send(result);
        });
    });

    //get one user
    app.get('/api/user/:uid', isAuthenticated, (req, res) => {
        client.query('select * from users where uid=$1', [req.params.uid], (err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(result.rows);
        });
    });

    //put one user 
    app.put('/api/user/:uid', isAuthenticated, (req, res) => {
        client.query('update user set where name=$1, email = $2, type = $3 where uid=$4', [req.body.name, req.body.email, req.body.type, req.params.uid], (err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(result.rows);
        });
    });


    //delete one user

    app.delete('/api/user/:uid', isAuthenticated, (req, res) => {
        client.query('delete form users where uid=$1'[req.params.uid], (err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(result.rows);
        });
    });



    //user profile
    app.get('/api/user/me', isAuthenticated, (req, res) => {
        client.query('select * from users where uid=$1', [req.session.userId], (err, result) => {
            if (err) return res.status(400).send(err);
            return res.status(200).send(result.rows);
        });
    });
}
