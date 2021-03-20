const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
require('./auth/routes')(app);

// ---  Serves all the static files ---- // 
app.use(express.static('../frontend'));
app.use(express.static('html'));
app.use(express.static('css'));

app.get('/', (_, res) => {
    res.sendFile('index.html', { root: '../frontend/html/' });
});

app.get('/login', (_, res) => {
    res.sendFile('login.html', { root: '../frontend/html/' });
});
app.get('/register', (_, res) => {
    res.sendFile('signup.html', { root: '../frontend/html/' });
});
app.get('/users', (_, res) => {
    res.sendFile('users.html', { root: '../frontend/html/' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}...`));