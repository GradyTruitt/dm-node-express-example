//Creating A server
const express = require('express');
const bodyParser = require('body-parser');

const port = 3000;      //Port Name - can't use 80 or 5432 - any other 4 digit number works.
const pokemon = [
    {
        name: 'Pikachu',
        number: 26
    },
    {
        name: 'Bulbasaur',
        number: 1
    },
    {
        name: 'Ivysaur',
        number: 2
    }
];


const app = express();

app.use(bodyParser.json()); //with .use() every request will be passed through this - it will be stripped and transformed into a JSON object.

//creating a GET http inpoint for my database
app.get('/api/pokemon', function(req, res, next) {
    res.json(pokemon);
});

//creating a POST http inpoint for my database
app.post('/api/pokemon', function(req, res, next){
    if (!req.body.name) { //If the request is not formatted properly build an if statement
        return res.status(418).json({err: "Name Required"});//include an error message with a status number 500, 404, 401- needs a return to end the function
    }
    pokemon.push(req.body); //req.body is created by the app.use() function above - req.body is going to be an object.
    res.json(pokemon);
});

app.delete('/api/pokemon', function(req, res, next){
    res.json(pokemon.pop());
});

app.listen(port, function(){
    console.log('Listening on Port: ' + port);
});