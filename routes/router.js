var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Eventy = require('../models/eventy');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



var a = null;



// GET route for reading data
router.get('/', function (req, res, next) {
    res.render('index');
});


//POST route for updating data
router.post('/', function (req, res, next) {
    // confirm that user typed same password twice
    if (req.body.password !== req.body.passwordConf) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        res.send("passwords dont match");
        return next(err);
    }

    if (req.body.email &&
        req.body.username &&
        req.body.password &&
        req.body.passwordConf) {

        var userData = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            passwordConf: req.body.passwordConf,
        }

        User.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                req.session.userId = user._id;
                return res.redirect('/profile');
            }
        });

    } else if (req.body.logemail && req.body.logpassword) {
        User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
            if (error || !user) {
                var err = new Error('Wrong email or password.');
                err.status = 401;
                return next(err);
            } else {
                req.session.userId = user._id;
                return res.redirect('/events-main');
            }
        });
    } else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
})

//POST route for adding new event
router.post('/events-main', function (req, res, next) {
    //stworz nowy rekord w db
    if (req.body.titleOfEvent &&
        req.body.describeOfEvent && req.body.nameOfOrganiser
        ) {

        var userData = {
            titleOfEvent: req.body.titleOfEvent,
            describeOfEvent: req.body.describeOfEvent,
            nameOfOrganiser : req.body.nameOfOrganiser
            
        }

        Eventy.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                
                return res.redirect('/added_events-main');
            }
        });

    }  
   
    
    
    //usun rekord z db
    else if (req.body.hTitleOfEvent && req.body.hDescOfEvent){
        
        
        
        Eventy.findOne({ titleOfEvent: req.body.hTitleOfEvent }).deleteOne().exec(function (err,eventies){
            console.log("cos sie tu dzieje : " , eventies);
            return res.redirect('/events-main');
        })  
    }
    
     //modufuj rekord z db
    else if (req.body.hTitleOfEvent2){
        console.log('waiting ....')
        console.log(req.body.hTitleOfEvent2)
        a = req.body.hTitleOfEvent2;
        return a;
         
    }
    
     else if (req.body.mTitleOfEvent2){
         console.log('htitle from mod',a);
         console.log('mtitle from mod',req.body.mTitleOfEvent2);
         
                  
        Eventy.update({ titleOfEvent: a }, {$set: {titleOfEvent: req.body.mTitleOfEvent2}}).exec(function (err,eventies){
            if (err) {
                return next(err);
            }
            else{
            console.log("cos sie tu dzieje modifikuja! : " , eventies);
            res.redirect('back');
        }})  
    }
        
    
        
   
        
        
        
    
    
    //kontrola błedów
    else {
            var err = new Error('All fields required.');
            err.status = 400;
            return next(err);
        }
    })











// GET route after registering   //z tego można zrobić midware kotry bedzie spawdzac zalogowanie moze //https://expressjs.com/en/guide/writing-middleware.html
router.get('/profile', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {
                return res.send('<h1>Name: </h1>' + user.username + '<h2>Mail: </h2>' + user.email + '<br><a type="button" href="/logout">Logout</a>')
            }
        }
    });
});

// GET route after login
router.get('/events-main', function (req, res, next) {
    User.findById(req.session.userId)
        .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {
                
                res.render('main');
                               
            }

};
});
    });

// GET route for json, public
router.get('/events-log.json', function (req, res, next) {
  Eventy.find().exec(function (err,eventies) {
                res.send(eventies); 
            }); 
    });


// GET route after adding new event
router.get('/added_events-main', function (req, res, next) {
    
    User.findById(req.session.userId)  
        .exec(function (error, user) {
        if (error) {
            return next(error);
        } else {
            if (user === null) {
                var err = new Error('Not authorized! Go back!');
                err.status = 400;
                return next(err);
            } else {
                console.log("Event Added")
                return res.redirect('/events-main');
                //return res.send('<h1>Name of Event: </h1>' + eventies.titleOfEvent + '<h2>Describe Of Event: </h2>' + eventies.describeOfEvent + '<br><a type="button" href="/logout">Logout</a>') //od razu wysla na storne my event
            }
        }
    });
});

                
             


// GET for logout logout
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;