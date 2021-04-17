/**
 * Summary. index.js sets up all the information for the server
 * Description. This file starts the server on the specified port either from the .env file or the port given
 * 
 * @file index.js
 * @author Bryce Schmisseur
 * @Since 3 January 2021
 */

 //Reads variables from the .env file
require('dotenv').config()

const express = require('express');
const logger = require('./middleware/logger');
const mongoose = require('mongoose');
const cors = require('./middleware/cors');
const heartratepath = require('./routes/api/heartRateRoute');
const userPath = require('./routes/api/userRoute');

//Creates application
const app = express();

//Inoder to process the HTTP request within the logs statements
app.use(express.urlencoded({ extended: true }));

//Grabs the port from the .env file or the given parameter
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//Connects to mongoose from the URL located within the .env file
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
app.use(express.json());
db.once('open', () => console.log('Connected to database'))

//Sets up the middleware in order to log the 
app.use(logger);
app.use(cors);

// Heart Rate API Routes
app.use('/api/heartrate', heartratepath);

// Heart Rate API Routes
app.use('/api/user', userPath);

//Starts to listen for request for the server=
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});