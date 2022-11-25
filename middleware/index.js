module.exports = (req, res, next) => {
    res.status(200); // Puede usarse res.status(200).send("Bienvenido al Pokedex");
    res.json({code: 1, message: "Bienvenido al pokedex"});
}