require('dotenv').config();



const express = require('express')
, session =require('express-session')
, passport = require('passport')
, Auth0Strategy = require('passport-auth0')
, massive = require('massive')
, users_controller = require('../src/controllers/users_controller.js')
, bodyParser = require('body-parser')//Dont forget this next time you fool!!!!
, exphbs = require('express-handlebars')
, nodemailer = require('nodemailer')
, cors = require('cors')
, stripe = require('stripe')(process.env.REACT_APP_STRIPE_KEY)//WTF????


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING,
    EMAIL_PASS,
    EMAIL_USER,
    LOGOUT,
    REACT_APP_LOGIN_SUCCESS,
    REACT_APP_LOGIN_FAIL
} = process.env;

const app = express();
massive(CONNECTION_STRING).then(db => {
    app.set('db' ,db);
})
app.use(cors());
app.use(express.static(__dirname+'/../build'));
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
    successRedirect: REACT_APP_LOGIN_SUCCESS,
    failureRedirect: REACT_APP_LOGIN_FAIL
} ))

app.get('/auth/me', (req,res) => {
    if (req.user){
        res.status(200).send(req.user);
    } else{
        res.status(401).send("Nice try suckaaaa!!!!")
    }
})

app.get('/auth/logout', (req, res) => {
     console.log ("req is now ", LOGOUT)
    req.logOut();
    res.redirect(LOGOUT)
})
app.get('/findcolor', users_controller.getColor)
app.get('/findmakes', users_controller.getMakes)
app.get('/findmodels/:make', users_controller.getModelsByMake)
app.post('/addwaitlist', users_controller.addWaitlist)
app.put('/profile', users_controller.updateProfile)

app.get('/filteredinventory/:make/:model/:year/:color', users_controller.getFiltered)
app.get('/findyear', users_controller.getYears)
app.get('/allinventory', users_controller.getAllInventory)
app.post('/enterinventory', users_controller.enterInventory)
app.delete('/delete_inventory/:id', users_controller.deleteInventory)
app.put('/edit_inventory/', users_controller.editInventory)
app.get('/user_waitlist/:id' , users_controller.getWaitlist)

app.post('/send_email', users_controller.notifyWaitlist)
app.delete('/delete_waitlist/:id', users_controller.deleteWaitlist)

app.post('/api/payment/:id', users_controller.upgradeUser)

app.get('/vehicles' , users_controller.getByColor)
// app.get('/vehicles', function(req,res, next){
//     var result = vehicles;
//     if (req.query.search){
//         result = result.filter(function())
//     }
// })

app.listen(SERVER_PORT, () => console.log(`listening on port ${SERVER_PORT}`));

