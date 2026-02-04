const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('./database');
require('dotenv').config();

console.log("--- DEBUG LOGS ---");
console.log("DB URL defined:", !!process.env.URL);
if (process.env.URL) {
    console.log("DB URL length:", process.env.URL.length);
}
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("------------------");

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/api/v1', (req, res) => {
    res.status(200).json({
        message: 'Welcome to Movie API Project',
        version: '1.0.0',
        author: 'Jose Luis Prieto',
        endpoints: {
            getAllMovies: 'https://api-movies-three.vercel.app/api/v1/movies',
            getOneMovie: 'https://api-movies-three.vercel.app/api/v1/movies/movie/:id',
            getGenres: 'https://api-movies-three.vercel.app/api/v1/movies/genres',
            addMovie: 'https://api-movies-three.vercel.app/api/v1/movies',
            updateMovie: 'https://api-movies-three.vercel.app/api/v1/movies/:id',
            deleteMovie: 'https://api-movies-three.vercel.app/api/v1/movies/:id'
        }
    });
});

app.use('/api/v1/movies', require('./routes/movie.route'))
app.use('', (req, res) => { res.status(404).json({ message: 'Route not found. Try /api/v1 for the endpoint list.' }) })

// Start the server
if (process.env.NODE_ENV !== 'production') {
    app.listen(app.get('port'), () => {
        console.log(`Listening on port ${app.get('port')}`)
    });
}

// Export for Vercel
module.exports = app;