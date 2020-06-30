//import necessary libraries to make this run & our modules
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

//serialize our user
passport.serializeUser(function(user, cb){
    cb(null, user.id);
})
//deserialized version

//password local config

//importing our database

module.exports = passport;