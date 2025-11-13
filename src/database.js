const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.URL;

// conectamos con la base de datos de mongoDB con la libreria mongoose
mongoose.connect(URL)
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log(err))

// exportamos
module.exports = mongoose;