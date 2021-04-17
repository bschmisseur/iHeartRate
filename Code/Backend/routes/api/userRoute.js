/**
 * Summary. userRoute.js is used to setup all http routes for the uesr object
 * Description. File that uses express router to create all HTTP GET, POST, and DELETE calls
 * 
 * @file userRouter.js
 * @author Bryce Schmisseur
 * @Since 14 January 2021
 */

const express = require('express');
const router = express.Router();
const User = require('../../models/user');

/**
 * Short description. HTTP GET request to return all the users within the database
 *
 * @access public
 *
 * @type   HTTP GET
 */
router.get('/', async (req, res) => {
  try {
    //Making find all call to the database
    const user = await User.find(); 

    //creates response for the HTTP request of all user
    res.json(user);
  } catch (err) {
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

/**
 * Short description. HTTP POST request to save a user to the database
 *
 * @access public
 *
 * @type   HTTP POST
 * @param {Number} appleid Description. with in the body of the request is generated id provided by Apple's oAuth request
 * @param {String} fullName Description. with in the body of the request is the first and last name of the user
 * @param {String} email Description. with in the body of the request is email of the user associated with the apple id account
 */
router.post('/', async (req, res) => {
  //Creates user object based on body parameters of the HTTP request
  const user = new User({
    appleid: req.body.appleId,
    fullName: req.body.displayName,
    profilePicture: req.body.profilePicture,
    email: req.body.email
  });
  try {
    //Saves the user object to MongoDB
    const newUser = await user.save()

    //Creates a HTTP 201 RESPONSE with full user object to confirm inserstion
    res.status(201).json(newUser)
  } catch (err) {
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

/**
 * Short description. HTTP GET request to get a specific user by id
 *
 * @access public
 *
 * @type   HTTP GET
 * @param {String} id Description. with in the HTTP parameters is the id associated with the user
 */
router.get('/:appleid', async (req, res) => {
  try {
    //Finds the user based on the user id
    user = await User.find({appleid: req.params.appleid})
    if (user == null) {
      //If no users are found associated with the id an HTTP 404 RESPONSE will be send back
      res.status(404).json({ message: 'Cant find any users'})
    } else {
      //Response with the full user object
      res.json(user)
    }
  } catch(err){
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
});

//Delete user by id
router.delete('/:id', async (req, res) => {
  try {
    //Finds the user based on the user id
    user = await User.findById(req.params.id)
    if (user == null) {
            //If no users are found associated with the id an HTTP 404 RESPONSE will be send back
      res.status(404).json({ message: 'Cant find any user'})
    } else {
      //Removes the user object from the database
      await res.user.remove()

      //Sends confirmation request of the deletion of the user
      res.json({ message: "User was removed" })
    }
  } catch(err){
    //If any error is caught a HTTP 500 RESPONSE is set back with the error message
    res.status(500).json({ message: err.message })
  }
})

router.post('/update', async (req, res) => {
  try {
    let udpate = JSON.stringify({
      profilePicture: req.body.profilePicture
    })
    User.findOneAndUpdate({_id: req.body._id}, {$set: {profilePicture: req.body.profilePicture}}, {new: true, upsert: true}, function (err, user) {
      res.json(user)
    });
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//Exports router to the index.js file
module.exports = router;