//const bodyParser = require ('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemon = require('./routes/pokemon')
const user = require ('./routes/user')

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/*
Verbos HTTP
GET - Obtiene recursos
POST - Crea/Almacena recursos
PATCH - Modificar una parte de un recurso
PUT - Modifica un recurso completo
DELETE - Borrar un recurso
*/
app.get("/", (req, res, next) => {
    res.status(200); // Puede usarse res.status(200).send("Bienvenido al Pokedex");
    res.json({code: 1, message: "Bienvenido al pokedex"});
});

app.use("/pokemon",pokemon);
app.use("/user", user);

app.use((req, res, next) => {
    return res.status(404).send({code: 404, message:  "URL no encontrada"});
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});