/**
 * Summary. user.js is a model of a user object
 * Description. This modle class holds all the properties of a user: id, appleid, fullName, and email
 * 
 * @file user.js
 * @author Bryce Schmisseur
 * @Since 5 January 2021
 */

const mongoose = require('mongoose')


/**
 * Short description. Mongoose Schema in order set the formate and collection of how and where the data
 * is inserted in to the database
 *
 * @access public
 *
 * @type     User
 * @property {String} id Description. unique id generated to insert into the database
 * @property {String} appleid Description. generated id provided by Apple's oAuth request
 * @property {String} fullName Description. the first and last name of the user
 * @property {String} email Description. email of the user associated with the apple id account
 */
const userSchema = new mongoose.Schema(
    {
        id: String,
        appleid: String,
        fullName: String,
        profilePicture: String,
        email: String,
    }
);

//Exports schema to the mongoose object
module.exports = mongoose.model('user', userSchema);