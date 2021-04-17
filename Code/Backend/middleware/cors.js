/**
 * Summary. logger.js is so any server can access the api
 * Description. uses middel ware to accept the request coming in from even a differnt server
 * 
 * @file cors.js
 * @author Bryce Schmisseur
 * @Since 28 Febuary 2021
 */

const cors = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", '*');
    res.header("Access-Control-Allow-Headers", "*");
    next();
}

module.exports = cors; 