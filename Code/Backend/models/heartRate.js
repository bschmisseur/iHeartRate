/**
 * Summary. heartRate.js is a model of a heart rate object
 * Description. This modle class holds all the properties of a heart rate: id, bpm, data, and userid
 * 
 * @file heartRate.js
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
 * @type     HeartRate
 * @property {String} id Description. unique id generated to insert into the database
 * @property {Number} bpm Description. the measure of the heart rate
 * @property {String} date Description. the date in which the heart rate was recorded
 * @property {String} userid Description. The user id associated with the heart rate
 */
const heartrateSchema = new mongoose.Schema(
    {
        
        id: {
            type: String
        },
        bpm: {
            type: Number,
            require: true
        },
        date: {
            type: String,
            require: true
        },
        userid: {
            type: String,
            require: true
        }
    }
);

//Exports schema to the mongoose object
module.exports = mongoose.model('heartrate', heartrateSchema);