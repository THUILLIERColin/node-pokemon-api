const pokemons = require("./mock-pokemon");

exports.success = (message, data) => {
  return {
    message,
    data,
  };
}

exports.getUniqueID = (pokemons) => {
    const pokemonIds = pokemons.map(pokemon => pokemon.id);
    return pokemonIds.length > 0 ? Math.max(...pokemonIds) + 1 : 1;
}