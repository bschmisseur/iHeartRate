/**
 * Summary. logger.js is created for the middleware of all request
 * Description. The middleware is created in order to log all request coming into the server
 * 
 * @file logger.js
 * @author Bryce Schmisseur
 * @Since 28 January 2021
 */

const moment = require('moment');

/**
 * Short description. Logger function in order to log out all information of the request
 *
 * @access public
 *
 * @type     Logger
 * @property {json} req Description. request information of the HTTP request
 * @property {json} res Description. response information of the HTTP response
 * @property {Any} next Description. the next funtion to call
 */
const logger = (req, res, next) => {
    //Console logs all the request coming into the server
    console.log(
        `${req.method} request to ${req.protocol}://${req.get('host')}${req.originalUrl} at ${moment().format()}`
      );
    //Continues to next 
    next();
}

//Exports logger for the index.js file
module.exports = logger; 