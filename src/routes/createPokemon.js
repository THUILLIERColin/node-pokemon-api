const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.post('/api/pokemon', (req, res) => {
    req.body.types = req.body.types.join()
    Pokemon.create(req.body)
      .then(pokemon => {
        const message = `Le pokémon ${req.body.name} a bien été crée.`
        pokemon.types = pokemon.types.split(',')
        res.json({ message, data: pokemon })
      })
  })
}