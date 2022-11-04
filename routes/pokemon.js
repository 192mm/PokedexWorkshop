const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/", async (req, res, next) => {
    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;

    if (pok_name && pok_height && pok_weight && pok_base_experience) {
        const query = "INSERT INTO pokemomn (pok_name, pok_height, pok_weight, pok_base_experience)";
        //query += "VALUES("+req.body.pok_name+")";
        query += `VALUES('${pok_name}',${pok_height}, ${pok_weight}, ${pok_base_experience})`

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Pokemon insertado correctamente" });
        }

        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
        //return res.status(200).send(query);
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });

})

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query("SELECT * FROM pokemon");
    res.status(200).json({ code: 1, message: pkmn });
})

/// para poner variables se usan ':'
pokemon.get('/:id([0-9]{1,3})', async (req, res, next) => {
    const id = req.params.id;
    if (id > 0 && id <= 722) {
        const pkmn = await db.query("SELECT * FROM pokemon WHERE pok_id = " + id)
        res.status(200).json({ code: 200, message: pkmn });
    }
    else {
        res.status(404).res.send({ code: 404, message: "Pokemoon no encontrado" });
    }
})
// Expresiones regulares AKA REGEX: ([0-9]{1,3}) y ([A-Za-z]) etc...
pokemon.get('/:name([A-Za-z]+)', async (req, res, next) => {
    const name = req.params.name;
    /*for(i = 0; i < pokemon.length; i++ )
    {
        if (pokemon[i].name.toUpperCase == name.toUpperCase )
        {
            res.status(200);
            res.send(pokemon[i]);
        }
    }*/
    const pkmn = await db.query("SELECT * FROM pokemon");
    const pk = pkmn.filter((p) => {
        ///El código siguiente facilita el uso de los valores de nuestro arreglo, puesto
        ///que devuelve un arreglo en vez de un elemento.
        /*if(p.name.toUpperCase() == name.toUpperCase()){
            return p;
        }
      */
        ///Esto 'operador ternario' facilita usar un if. No es lo mismo que un if, es distitno
        ///Tiene aplicaciones similares pero puede ser mejor utilizar el if
        ///Condición a evaluar ? valor si es verdadero : valor si es falso
        return (p.pok_name.toUpperCase() == name.toUpperCase()) ?? p;
    })

        /*console.log(pk);
        if (pk.length > 0) {
            return res.status(200).send(pk);
        }
        return res.status(404).send("Pokemon no encontrado")*/
        (pk.length > 0) ? res.status(200).json({ code: 200, message: pk }) : res.status(404).send({ code: 404, message: "Pokemon no encontrado" });
})

module.exports = pokemon; //la más sencilla de usar. Solo permite exportar una cosa