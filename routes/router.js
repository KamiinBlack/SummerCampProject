var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Eventy = require('../models/eventy');
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;



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
    
    if (req.body.titleOfEvent &&
        req.body.describeOfEvent
        ) {

        var userData = {
            titleOfEvent: req.body.titleOfEvent,
            describeOfEvent: req.body.describeOfEvent
            
        }

        Eventy.create(userData, function (error, user) {
            if (error) {
                return next(error);
            } else {
                
                return res.redirect('/added_events-main');
            }
        });

    }  
    else if (req.body.hTitleOfEvent){
        //let adress = '/added_events-main/' + req.body.hTitleOfEvent;
        
        let todelete = {
            TitleOfEvent: req.body.hTitleOfEvent,
            describeOfEvent: req.body.hDescOfEvent
        }
        
        let todelete2 = {"TitleOfEvent": req.body.hTitleOfEvent }
        
        //let a = Eventy.findOne(todelete2).exec();
        //console.log(a);
        
        Eventy.remove({"TitleOfEvent" : "aaa:"}, function(err, obj) {
            if (err) throw err;
            console.log(obj.result + " document(s) deleted");
            Eventy.close();
             });
 
    }
    
    else {
        var err = new Error('All fields required.');
        err.status = 400;
        return next(err);
    }
    
})


// GET route after registering
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
                Eventy.find().exec(function (err,eventies) {
                //console.log(eventies); 
                res.render('main');
                
            });        
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