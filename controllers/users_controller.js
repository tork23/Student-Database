const User = require('../models/user');
const fs = require('fs');
const path = require('path');

// let's keep it same as before
module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.redirect('/');
    });
}

// render the sign up page
module.exports.signUp = function(req, res){
    // if session cookie still there, head towards profile
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    // session expired-->render sign up page
    return res.render('user_sign_up', {
        title: "Sign Up"
    })
}

// render the sign in page
module.exports.signIn = function(req, res){
    // Session cookie present
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    // session cookie not present
    return res.render('user_sign_in', {
        title: "Sign In"
    })
}

// get the sign up data
module.exports.create = function(req, res){
    // If passwords do not match during sign up
    console.log(req.body);
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Passwords do not match');
        return res.redirect('back');
    }
    // Search in database
    User.findOne({employee_id: req.body.employee_id}, function(err, user){
        if(err){req.flash('error', err); return}

        // New user
        if (!user){
            // create new user and add to userSchema
            User.create(req.body, function(err, user){
                if(err){req.flash('error', err); return}
                // return to sign-in page
                return res.redirect('/users/sign-in');
            })
        // User already exits
        }else{
            req.flash('success', 'You have signed up, login to continue!');
            return res.redirect('back');
        }
    })
}

// sign in and create a session for the user
module.exports.createSession = function(req, res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }

        req.flash('success', 'You have logged out!');
        res.redirect('/');
      });
}






