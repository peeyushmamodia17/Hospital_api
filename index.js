const express=require('express');
const path=require('path');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const sassMiddleware=require('node-sass-middleware');
const db=require('./config/mongoose');
const middleware=require('./config/middleware');
const session= require('express-session');
const flash=require('connect-flash');
const passport=require('passport');
const MongoStore=require('connect-mongo')(session);
//here we export the passport local and passport google oauth
const passportLocal=require('./config/passport-local');
const passportJWT = require('./config/passport-jwt');

app.use(express.urlencoded());
app.use(expressLayouts);

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// app.use(session({ cookie: { maxAge: 60000 }, 
//     secret: 'woot',
//     resave: false, 
//     saveUninitialized: false}));
app.use(session({
    secret:'peeyush',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100)
    },
    store: new MongoStore(
        {
        
            mongooseConnection :db,
            autoRemove:'disabled'
        },
        function(err){
            console.log(err || 'connect mongodb setup ok')
        }
    )
}));

app.use(sassMiddleware({
    src : './assets/scss',
    dest :'./assets/css',
    debug : true,
    outputStyle : 'extended',
    prefix : '/css'
}))
app.use(express.static('assets'));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash());
app.use(middleware.setFlash);
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("error in running the server on port");
    }

    console.log("Server successfully running on port",port);
})