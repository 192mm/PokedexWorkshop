module.exports = (req, res, next) => {
    return res.status(404).send({code: 404, message:  "URL no encontrada"});
}