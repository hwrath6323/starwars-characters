const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//CORS - Cross Origin Request S...

const app = express();

const characters = [
    {
        name: 'Anakin Skywalker',
        title: 'Darth Vader',
        affiliation: 'Empire',
        homePlanet: 'Tattooine',
    },
    {
        name: 'Han Solo',
        title: 'Smuggler',
        affiliation: 'Rebellion',
        homePlanet: 'Correlia',
    },
];


//http.createServer((req, res) => {
//    console.log(req.method + ' to ' + req.url);
//
//    res.end({message: 'bouchey douchey'});
//
//
//});

//app.use((req, res, next) => {
//    res.header('Access-Control-AllowOrigin', '*');
//
//    next();
//});

app.use(cors());

app.use(bodyParser.json());

// app.use(express.static(__dirname + /../build))

app.get('/characters', (req, res) => {
    res.send(characters)
});

app.post('/characters', (req, res) => {
    const newCharacter = req.body;

    characters.push(newCharacter);

    res.send(newCharacter);
});

app.patch('/characters/:id', (req, res) => { // or PUT
    const { id } = req.params;
    const character = req.body;
    
    characters[id] = character;
    
    res.send(character);
});

app.delete('/characters/:id', (req, res) => {
    const { id } = req.params;
    
    const removedCharacter = characters.splice(id, 1);
    
    res.send(removedCharacter);
});

const port = 3002; 

app.listen(3002, () => {
    console.log(`Server listening at ${port}`);
});