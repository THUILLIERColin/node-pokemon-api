const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        pokemons.map(pokemon => {
          pokemon.types = pokemon.types.split(',')
        })
        res.json({ message, data: pokemons })
      })
  })
}