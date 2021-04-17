/**
 * Summary. heartRateRoute.js is used to setup all http routes for the heart rate object
 * Description. File that uses express router to create all HTTP GET, POST, and DELETE calls
 * 
 * @file heartRateRoute.js
 * @author Bryce Schmisseur
 * @Since 14 January 2021
 */

const express = require('express');
const moment = require('moment');
const router = express.Router();
const HeartRate = require('../../models/heartRate');

/**
 * Short description. HTTP GET request to return all the heart rates within the database
 *
 * @access public
 *
 * @type   HTTP GET
 */
router.get('/', async (req, res) => {
  try {
    //Making find all call to the database
    const heartRates = await HeartRate.find(); 

    //creates response for the HTTP request of all heart rates 
    res.json(heartRates);
  } catch (err) {
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

/**
 * Short description. HTTP POST request to save a heart rate to the database
 *
 * @access public
 *
 * @type   HTTP POST
 * @param {Number} bpm Description. with in the body of the request is the measure of the heart rate
 * @param {String} date Description. with in the body of the request is the date in which the heart rate was recorded
 * @param {String} userid Description. with in the body of the request is the user id associated with the heart rate
 */
router.post('/', async (req, res) => {
  //Creates heart rate object based on body parameters of the HTTP request
  const heartRate = new HeartRate({
    bpm: req.body.bpm,
    date: req.body.date,
    userid: req.body.userid
  });
  try {
    //Saves the heart rate object to MongoDB
    const newHeartRate = await heartRate.save()
    //Creates a HTTP 201 RESPONSE with full heart rate object to confirm inserstion
    res.status(201).json(newHeartRate)
  } catch (err) {
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

/**
 * Short description. HTTP GET request to grab all the heart rates associated with a specific user id
 *
 * @access public
 *
 * @type   HTTP GET
 * @param {String} userid Description. with in the HTTP parameters is the user id associated with the heart rate
 */
router.get('/:userid', async (req, res) => {
  try {
    console.log("Userid:", req.params.userid);
    //Grabs all heartrates by specified userid
    const heartRate = await HeartRate.find({userid: req.params.userid});
    if (heartRate == null) {
      //If no heart rates are found associated with the user an HTTP 404 RESPONSE will be send back
      res.status(404).json({ message: 'Cant find any heart rates associated with the user'})
    } else {
      //Sends all the heart rates back within json formated data
      res.json(heartRate)
    }
  } catch(err){
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
});

router.get('/rate/:id', async (req, res) => {
  try {
    console.log("HeartRate ID:", req.params.id);
    //Grabs all heartrates by specified userid
    const heartRate = await HeartRate.find({_id: req.params.id});
    if (heartRate == null) {
      //If no heart rates are found associated with the user an HTTP 404 RESPONSE will be send back
      res.status(404).json({ message: 'Cant find any heart rates associated with that id'})
    } else {
      //Sends all the heart rates back within json formated data
      res.json(heartRate)
    }
  } catch(err){
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
});

/**
 * Short description. HTTP DELETE request to delete a heart rate within the database specified by an id
 *
 * @access public
 *
 * @type   HTTP DELETE
 * @param {String} id Description. found within the HTTP pararmers is an unique id generated to insert into the database
 */
router.delete('/:id', async (req, res) => {
  try {
    //Trys to find the heart rate that was given within the HTTP parameters
    heartRate = await HeartRate.findById(req.params.id)
    if (heartRate == null) {
      //If no heart rates are found associated with the user an HTTP 404 RESPONSE will be send back
      res.status(404).json({ message: 'Cant find any heart rate'})
    } else {
      //Removes the heart rate from the database
      await res.heartRate.remove()
      //Sends confirmation request of the deletion of the heart rate
      res.json({ message: "Heart Rate was removed" })
    }
  } catch(err){
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

//Exports all routes to the index.js file
module.exports = router;