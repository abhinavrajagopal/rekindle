const   userModel = require('../models/user'),
LocalStrategy = require('passport-local');

module.exports = function(passport){

    passport.use(new LocalStrategy({
            passReqToCallback : true
        },
        function(req,username, password, done) {

            console.log(username, password)

            userModel.findOne({ username: username }, function (err, user) {

                if (err) { return done(err); }

                if (!user) { return done(null, false); }

                user.verifyPassword(password)
                .then((data)=>{
                    console.log("verifying ", data)
                    if(!data)   return done(null, false);

                    return done(null, user);
                });

            })
            .catch((err)=>{
                console.log('err');
                done(err);
            })

        }));

    passport.serializeUser(function(user, cb) {
        cb(null, user._id);
    });

    passport.deserializeUser(function(id, cb) {

        userModel.findById(id, function (err, user) {
            if (err) { return cb(err); }
            cb(null, user);
        });

    });

}
