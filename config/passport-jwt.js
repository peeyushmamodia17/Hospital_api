const passport = require('passport');
//import passport jwt strategy
const JWTStrategy = require('passport-jwt').Strategy;
//it is use to extract the data from token
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user_doctor');

//here define secret key
let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}


passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    //here we find the user by token payload
    User.findById(jwtPayLoad._id, function(err, user){
        if (err){console.log('Error in finding user from JWT'); return;}

        if (user){
            return done(null, user);
        }else{
            return done(null, false);
        }
    })

}));

module.exports = passport;
