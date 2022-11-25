//const bodyParser = require ('body-parser');
//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();
//Routes
const pokemon = require('./routes/pokemon')
const user = require ('./routes/user')
//Middleware
const auth = require ('./middleware/auth')
const notFound = require ('./middleware/notFound');
const index = require ('./middleware/index');
const cors = require ('./middleware/cors');

app.use(cors);
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
app.get("/", index);

app.use("/user", user);

app.use(auth);

app.use("/pokemon",pokemon);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('server is running');
});