const express = require("express");
const router = express.Router();
const db = require("../models");
//import middleware
const flash = require("flash");
const passport;

//register get route
router.get("/register", function(req, res) {
    res.render("auth/register");
})

//register post route
router.post("/register", function(req, res) {
    db.user.findOrCreate({
        where: {
            email: req.body.email
        }, defaults: {
            name: req.body.name,
            password: req.body.password
        }
    }).then(function(user, created) {
        //if user was created
        if (created){
            
            //authenticate user and start authorization process
            console.log("User created 🥥");
            res.redirect("/"); 
        } else {
            console.log("User email already exists. 🏴‍☠️");
            req.flash("error", "Error: email already exists for user. Try again.");
            res.redirect("/auth/register");
        }
    }).catch(function(error){
        console.log(`Error found. \nMessage: ${error.message}. Please review - ${error}`);
        req.flash("error", error.message);
        res.redirect("auth/register");
    })
})

//login get route
router.get("/login", function(req, res) {
    res.render("auth/login")
})

//post route
router.post("/login", function(req, res){
    passport.authenticate("local", function(error, user, info){
        //if no user authenticated
        if (!user) {
            req.flash("error", "Invalid username or password");
            //we are going to save our usersession no username
            //redirect our user to try logging in again
        }
        if (error) {
            //TODO: add next param from function
            return error;
        }
        req.login(function(user, error){
            //if error, move to error
            //if success, flash success message
            //if success save session and redirect user
        })
    })
})

router.post("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/auth/login",
    successFlash: "Welcome to our app!",
    failureFlash: "Invalid username or password."
}));

//export router
module.exports = router;