const express = require('express');
let pokemons = require('./mock-pokemon');
const { success, getUniqueID } = require('./helper');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app
 .use(favicon(__dirname + '/favicon.ico'))
 .use(morgan('dev'))
 .use(bodyParser.json());

app.get('/', (req, res) => res.send('Hello Express !'));

app.get('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id);
    const message = 'Un pokémon a été trouvé';
    res.json(success(message, pokemon));
})

app.get('/api/pokemons', (req, res) => {
    res.json(success('La liste des pokémons à bien été récupéré', pokemons));
})

app.post('/api/pokemons', (req, res) => {
    const id = getUniqueID(pokemons);
    const pokemonCreated = { ...req.body, ...{ id, created: new Date() } };
    pokemons.push(pokemonCreated);
    res.json(success(`Le pokémon ${pokemonCreated.name} a bien été créé`, pokemonCreated));
})

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let pokemonToUpdate = pokemons.find(pokemon => pokemon.id === id);
    const pokemonUpdated = { id: id, ...req.body, created: pokemonToUpdate.created };
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    })
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });

   app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));