const express = require('express');
let pokemons = require('./mock-pokemon');
const { success } = require('./helper');

const app = express();
const port = 3000;

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

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));