const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const sequelize = require('./src/db/sequelize');

const app = express();
const port = 3001;

app
 .use(favicon(__dirname + '/favicon.ico'))
 .use(morgan('dev'))
 .use(bodyParser.json());

sequelize.initDb()

// Endpoint
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);

// Handling 404 errors

app.use((req, res, next) => {
    const message = `Impossible de trouver la ressource demandée ! Vous pouvez essayer une autre URL.`;
    res.status(404).json({ message });
});

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`));