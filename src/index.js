const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const { mongoose } = require('./database');
require('dotenv').config();

// Settings
app.set('port', process.env.PORT || 3000);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/movies', require('./routes/movie.route'))
app.use('', (req, res) => { res.status(404).json({ message: 'API is in /api/v1/movies' }) })

// Start the server
if (process.env.NODE_ENV !== 'production') {
    app.listen(app.get('port'), () => {
        console.log(`Listening on port ${app.get('port')}`)
    });
}

// Export for Vercel
module.exports = app;