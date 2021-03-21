const express = required('express');
const app = express();
app.use(express.json());
const client = require('../db');
const isAuthenticated = require('../auth/verify');

module.exports = app => {
    
    //catch em all (homepage reviews)
    app.get('/api/reviews/', (req, res) => {
        client.query('SELECT * FROM reviews', (err, result) => {
            if(err){
                return res.status(500).send('All error');
            }
            return res.status(200).send(result.rows);
        });
    });
    
    //get user reviews
    app.get('/api/reviews/me', isAuthenticated, (req, res) => {
        client.query('SELECT * FROM reviews WHERE uid = $1', 
        [req.session.userId], (err, result) => {
            if(err){
                return res.status(500).send('My Reviews Error');
            }
            return res.status(200).send(result.rows);
        });
    });
    
    //display(get) review by rid
    app.get('/api/reviews/:rid', (req, res) => {
        const { rid } = req.params;
        client.query("SELECT * FROM reviews WHERE rid = $1", 
        [rid], (err, result) => {
            if(err){
                return res.status(500).send('RID Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get reviews by user id
    app.get('/api/reviews/users/:uid', (req, res) => {
        const { uid } = req.params;
        client.query("SELECT * FROM reviews WHERE uid = $1", 
        [uid], (err, result) => {
            if(err){
                return res.status(500).send('UID Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get reviews by officer name
    app.get('/api/reviews/officer/name/:off_name', (req, res) => {
        const { off_name } = req.params;
        client.query("SELECT * FROM reviews WHERE off_name = $1", 
        [off_name], (err, result) => {
            if(err){
                return res.status(500).send('Officer Name Error');
            }
            return res.status(200).send(result.rows);
        });
        
    });

    //get reviews by officer badge number
    app.get('/api/reviews/officer/num/:off_num', (req, res) => {
        const { off_num } = req.params;
        client.query("SELECT * FROM reviews WHERE off_num = $1", 
        [off_num], (err, result) => {
            if(err){
                return res.status(500).send('Officer Num Error');
            }
            return res.status(200).send(result.rows);
        });
    });
    
    //get reviews based on location
    app.get('/api/reviews/location/:location', (req, res) => {
        const { location } = req.params;
        client.query("SELECT * FROM reviews WHERE location = $1", 
        [location], (err, result) => {
            if(err){
                return res.status(500).send('Location Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get number of likes for review
    app.get('/api/reviews/likes/:likes', (req, res) => {
        const { likes } = req.params;
        client.query("SELECT * FROM reviews WHERE likes = $1", 
        [likes], (err, result) => {
            if(err){
                return res.status(500).send('Likes Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get number of dislikes for review
    app.get('/api/reviews/dislikes/:dislikes', (req, res) => {
        const { dislikes } = req.params;
        client.query("SELECT * FROM reviews WHERE dislikes = $1", 
        [dislikes], (err, result) => {
            if(err){
                return res.status(500).send('Dislikes Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get rating component of review
    app.get('/api/reviews/rating/:rating', (req, res) => {
        const { rating } = req.params;
        client.query("SELECT * FROM reviews WHERE rating = $1", 
        [rating], (err, result) => {
            if(err){
                return res.status(500).send('Likes Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //get number of reviews given by a user
    app.get('/api/reviews/count/:uid', (req, res) => {
        const { uid } = req.params;
        client.query("SELECT COUNT(*) FROM reviews WHERE uid = $1", 
        [uid], (err, result) => {
            if(err){
                return res.status(500).send('Review Count Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //post a review
    app.put('/api/reviews/post', isAuthenticated, (req, res) => {
        const { rating, text, likes, dislikes, off_name, off_num, location } = req.body;
        client.query("INSERT INTO reviews (rating, text, likes, dislikes, off_name, off_num, location) VALUES ($1, $2, $3, $4, $5, $6, $7)", 
        [rating, text, likes, dislikes, off_name, off_num, location], (err, result) => {
            if(err){
                return res.status(500).send('Review Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //like a review, increment likes
    app.put('/api/reviews/liked/:rid', isAuthenticated, (req, res) => {
        const { rid } = req.params;
        const { likes } = req.body;
        client.query("UPDATE reviews SET likes = $1 WHERE rid = $2", 
        [likes, rid], (err, resultult) => {
            if(err){
                return res.status(500).send('Liking Error');
            }
            return res.status(200).send(result.rows);
        });
    });

    //dislike a review, increment dislikes
    app.put('/api/reviews/disliked/:rid', isAuthenticated, (req, res) => {
        const { rid } = req.params;
        const { dislikes } = req.body;
        client.query("UPDATE reviews SET dislikes = $1 WHERE rid = $2", 
        [dislikes, rid], (err, resultult) => {
            if(err){
                return res.status(500).send('Disliking Error');
            }
            return res.status(200).send(result.rows);
        });
    }); 
}
