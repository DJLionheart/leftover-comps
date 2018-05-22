require('dotenv').config();

const express = require('express')
    , app = express()
    , massive = require('massive')
    , session = require('express-session')
    , Auth0Strategy = require('passport-auth0')
    , passport = require('passport');
    
const {
    PORTE,
    CONNECTION_STRING,
    REACT_APP_REGISTER,
    SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    AUTH,
    SUCCESS,
    FAILURE
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
}).catch(err => console.log('Error connecting to db! ', err));

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true, 
    cookie: {
        favorite_posts: []
    }
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, 
function(accessToken, refreshToken, extraParams, profile, done) {

    const { id, displayName, picture } = profile
        , db = app.get('db');

    db.get_user([id]).then(user => {
        console.log('DB get user: ', user[0])
        if(user[0]) {
            return done(null, user[0].authid)
        } else {

            db.create_user([id, displayName, picture]).then( newUser => {
                console.log('DB create user: ', newUser[0])
                return done(null, newUser[0].authid)
            })
        }
    })
}));

passport.serializeUser((authid, done) => {
    return done(null, authid);
}) 

passport.deserializeUser( (authid, done) => {
    db = app.get('db');
    db.get_user([authid]).then(user => {
        console.log("Deserialize User: ", user);
        return done(null, user[0])
    })
})



app.get(AUTH, passport.authenticate('auth0'), )

app.get(CALLBACK_URL, passport.authenticate('auth0', {
    successRedirect: SUCCESS,
    failureRedirect: FAILURE
}))

app.get('/api/user', (req, res, next) => {

    console.log('Get user endpoint hit: ', req)

    if(req.user) {
        console.log('User: ', req.user);
        res.status(200).send(req.user)
    }
})

app.post(REACT_APP_REGISTER, (req, res, next) => {
    const { username, pass } = req.body;
    db.create_user([username, pass]).then( user => {
        res.status(200).send(user[0])
    }).catch(err => console.log('Error creating user! ', err));
})

app.get(CALLBACK_URL, (req, res, next) => {
    const { username, pass } = req.body;
    db.get_user([username, pass]).then( user => {
        res.status(200).send(user[0])
    }).catch(err => console.log('Error retrieving user! ', err));
})    

app.post('/api/posts/compose/:id', (req, res, next) => {
    const db = app.get('db');
    const { id } = req.params
        , { title, body, img } = req.body;

    db.create_post([id, title, body, img]).then( results => {
        res.status(200).send(results[0])
    }).catch(err => console.log('Error creating post on DB: ', err))
})

app.put('/api/posts/update/:postid', (req, res, next) => {
    const db = app.get('db');
    const { postid } = req.params
        , { title, img, body } = req.body;

    db.update_post([postid, title, img, body]).then( results => {
        res.status(200).send(`Post ${postid} successfully updated!`)
    }).catch(err => console.log('Error updating post on DB: ', err))
})
    
    


app.listen(PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${PORTE}, sire!` )});