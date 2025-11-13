const Movie = require('../models/movie.model');
const movieController = {};


//CRUD DATABASE MOVIES

// GET ALL
movieController.getMovies = async (req, res) => {
    await Movie.find() // Select * en ORM mongoose
        .then(movies => {
            res.status(200).json({
                status: true,
                movies
            })
        })
        .catch(err =>
            res.status(400).json({
                status: false,
                message: err.message
            }))
}

// GET ONE
movieController.getOneMovie = async (req, res) => {
    await Movie.findById(req.params.id)
        .then(data => {
            if (data) { // por si el id es valido pero no existe en nuestra bd
                res.status(200).json({
                    status: true,
                    movie: data
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No movie found with this ID'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
}

// POST
movieController.addMovie = async (req, res) => {
    const myMovie = new Movie(req.body);
    await myMovie.save() //  seria un insert en la bd en ORM mongoose
        .then(() => {
            res.status(201).json({
                status: true,
                message: 'Movie added successfully',
            })
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })

}

//POST ARRAY
movieController.addManyMovies = async (req, res) => {
    // 1. Usamos el modelo directamente con insertMany()
    //    req.body debe ser un array: [{title: 'A'}, {title: 'B'}, ...]
    Movie.insertMany(req.body)
        .then((docs) => {
            // docs es el array de documentos insertados
            res.status(201).json({
                status: true,
                message: 'Movies added successfully',
                insertedMovies: docs.length // Opcional: para saber cuántas se insertaron
            })
        })
        .catch(err => {
            // El error puede incluir detalles sobre qué documentos fallaron
            res.status(400).json({
                status: false,
                message: 'Error adding movies: ' + err.message
            })
        })
}

// PUT
movieController.putMovie = async (req, res) => {
    const movie = req.body;
    await Movie.findByIdAndUpdate(  //  seria un update en la bd en ORM mongoose
        req.params.id,
        movie,
        {new: true, overwrite: true}
    )
        .then(data => {
            if (data) { // por si el id es valido pero no existe en nuestra bd
                res.status(200).json({
                    status: true,
                    message: 'Movie successfully updated',
                    movie: data
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No movie found with this ID'
                })
            }

        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })


}
// El Put y el Patch en Mongoose el Put vale para los dos
// PATCH
movieController.patchMovie = async (req, res) => {

    const movie = req.body;
    await Movie.findByIdAndUpdate(  //  seria un update en la bd en ORM mongoose
        req.params.id,
        {$set: movie},
        { new: true }
    )
        .then(data => {
            if (data) { // por si el id es valido pero no existe en nuestra bd
                res.status(200).json({
                    status: true,
                    message: 'Movie successfully updated',
                    movie: data
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No movie found with this ID'
                })
            }

        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })


}
// DELETE
movieController.deleteMovie = async (req, res) => {
    await Movie.findByIdAndDelete(req.params.id)
        .then(data => {
            if (data) { // por si el id es valido pero no existe en nuestra bd
                res.status(200).json({
                    status: true,
                    message: 'Movie successfully deleted',
                })
            } else {
                res.status(404).json({
                    status: false,
                    message: 'No movie found with this ID'
                })
            }
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                message: err.message
            })
        })
}

// movieController.addManyMovies = async (req, res, next) => {
//     try {
//         const payload = req.body;
//         if (!Array.isArray(payload) || payload.length === 0) {
//             return res.status(400).json({ message: 'Se espera un array no vacío de películas' });
//         }
//         const docs = await Movie.insertMany(payload, { ordered: true }); // Mongoose
//         return res.status(201).json(docs);
//     } catch (err) {
//         return next ? next(err) : res.status(500).json({ message: 'Error insertando películas', error: err.message });
//     }
// };

module.exports = movieController;