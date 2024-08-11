const { Pokemon } = require('../db/sequelize')
  
module.exports = (app) => {
  app.put('/api/pokemon/:id', (req, res) => {
    const id = req.params.id
    req.body.types = req.body.types.join()
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      Pokemon.findByPk(id).then(pokemon => {
        const message = `Le pokémon ${pokemon.name} a bien été modifié.`
        pokemon.types = pokemon.types.split(',')
        res.json({message, data: pokemon })
      })
    })
  })
}