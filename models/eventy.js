var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    titleOfEvent: {
        type: String,
        //unique: true,
        sparse: true,
        required: true,
        trim: true
    },
    describeOfEvent: {
        type: String,
        //unique: true,
        sparse: true,
        required: true,
        trim: true
    },
    nameOfOrganiser: {
        type: String,
        unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    describeofEvent: {
        type: String,
        unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    localization: {
        type: String,
        //unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    startDate: {
        type: String,
        //unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    endDate: {
        type: String,
        //unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    photoOfEvent: {
        type: String,
        //unique: true,
        sparse: true,
        //required: true,
        trim: true
    },
    category: {
        type: String,
        //unique: true,
        sparse: true,
        //required: true,
        trim: true,
        enum : ["1","2"]
    }
});


//authenticate input against database
/*UserSchema.statics.authenticate = function (email, password, callback) {
    User.findOne({ email: email, password: password })
        .exec(function (err, user) {
        if (err) {
            return callback(err)
        } else if (!user) {
            var err = new Error('User not found.');
            err.status = 401;
            return callback(err);
        }
        if(password == user.password){
            return callback(null, user);
        }else{
            return callback();
        }
    });  Ctrl-Shift-/
};*/




var Eventy = mongoose.model('Eventy', UserSchema);
module.exports = Eventy;