require('dotenv').config();



const express = require('express')
, session =require('express-session')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, massive = require('massive')
, users_controller = require('../src/controllers/users_controller.js')
, bodyParser = require('body-parser')//Dont forget this next time you fool!!!!

const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express();
massive(CONNECTION_STRING).then(db => {
    app.set('db' ,db);
})
app.use(bodyParser.json())
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true

}));

app.use(passport.initialize());
app.use(passport.session());


passport.use( new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, function (accessToken, refreshToken, extraParams, profile, done){
  
    const db = app.get('db');
    db.find_user([profile.id])
    .then( user => {
        if (!user[0]){
            db.create_user([profile.displayName, profile.picture, profile.id])
            .then(res => {
                done(null, res[0].id);
            })
        } else {
            done(null, user[0].id)
        }
    })

}));


passport.serializeUser((id, done)=> {
    done(null, id)
});

passport.deserializeUser((id, done)=> {
    app.get('db').find_session_user([id])
    .then(user => {
        done(null, user[0])
    })
    
});

app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect:'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/'
} ))

app.get('/auth/me', (req,res) => {
    if (req.user){
        res.status(200).send(req.user);
    } else{
        res.status(401).send("Nice try suckaaaa!!!!")
    }
})

app.get('/auth/logout', (req, res) => {
    // console.log ("req is now ", req)
    req.logOut();
    res.redirect('http://localhost:3000/')
})
app.get('/findcolor', users_controller.getColor)
app.get('/findmakes', users_controller.getMakes)
app.get('/findmodels/:make', users_controller.getModelsByMake)
app.post('/addwaitlist', users_controller.addWaitlist)
app.put('/profile', users_controller.updateProfile)


app.get('/findyear', users_controller.getYears)


app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));