const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');


// rutas de CRUD BASICO
// la ruta base se coge la que hemos predefinido en el index
router.get('/', movieController.getMovies);
router.get('/movie/:id', movieController.getOneMovie);
router.post('/',movieController.addMovie);
router.post('/bulk', movieController.addManyMovies); // nueva ruta para array
router.put('/:id',movieController.putMovie);
router.patch('/:id',movieController.patchMovie);
router.delete('/:id',movieController.deleteMovie);

router.get('/genres', movieController.getGenres);

// para permitir montar las rutas de las peticiones https -> GET, POST, PUT, PATH , DELETE
module.exports = router;
