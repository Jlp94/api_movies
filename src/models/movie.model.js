const mongoose = require('mongoose');
const {Schema} = mongoose;


// nuestra API tendra estos campos
const movieSchema = new Schema({
        title: {type: String, required: true}, // podemos anyadir mensajes de error , message: 'Title is required'
        plot: {type: String, required: true},
        director: {type: String, required: true},
        poster: {type: String, required: true},
        year: {type: Number, default: new Date().getFullYear()}, // no requiere valor
        best: {type: Boolean, default: false}, // no requiere valor
        genres: [{type: String, required: true}], // Colleciones []
        imdb: { // objetos  {}
            rating: {type: Number, required: true},
            votes: {type: Number, required: true}
        }
    },
    {
        timestamps: true,
        versionKey: false
    });

module.exports = mongoose.model('Movie', movieSchema, 'movies');
// por defecto se crea una coleccion con el nombre del modelo anyadiendo una s al final
// , pero podemos especificarlo nostros en la posicion collection , en mi caso la llame igual pero se puede cambiar