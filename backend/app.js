const express = require('express');
const app = express();
app.use(express.json());

const players = [
    {
        id: 1, name: 'John', age: 17
    },
    {
        id: 2, name: 'Joe', age: 16
    }
];

app.get('/api/players', (req, res) => {
    res.send(players);
});

app.get('/api/player/:id', (req, res) => {
    if (parseInt(req.params.id)> 2) {
        res.status(400).send("Invalid id");
        return;
    }
    const player = players.find(p => p.id === parseInt(req.params.id));
    res.send(player);
});

app.post('/api/player/', (req, res) => {
    console.log(req.body);
    const player = {
        id: players.length + 1,
        name: req.body.name,
        age: req.body.age
    };
    console.log(players);
    players.push(player);
    res.send(player);
});

app.put('/api/player/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    const name = req.body.name;
    const age = req.body.age;
    player.age = age;
    player.name = name;
    res.status(200).send(player);
});

app.delete('/api/player/:id', (req, res) => {
    const player = players.find(p => p.id === parseInt(req.params.id));
    players.pop(player);
    res.send("Deleted player");
});

const port = 3000;
app.listen(port, () => console.log("Server listening..."));
