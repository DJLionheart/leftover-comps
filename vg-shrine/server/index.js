require('dotenv').config();

const express = require('express')
    , app = express()
    , massive = require('massive')
    , session = require('express-session');
    
const {
    PORTE,
    CONNECTION_STRING,
    REACT_APP_LOGIN,
    REACT_APP_REGISTER,
    SECRET
} = process.env;

app.use(express.json());

app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1800000
    } 
}))

massive(CONNECTION_STRING).then( db => {
    app.set('db', db);
}).catch(err => console.log('Error connecting to db! ', err));

const db = app.get('db');


app.post(REACT_APP_REGISTER, (req, res, next) => {
    const { username, pass } = req.body;
    db.create_user([username, pass]).then( user => {
        res.status(200).send(user[0])
    }).catch(err => console.log('Error creating user! ', err));
})

app.get(REACT_APP_LOGIN, (req, res, next) => {
    const { username, pass } = req.body;
    db.get_user([username, pass]).then( user => {
        res.status(200).send(user[0])
    }).catch(err => console.log('Error retrieving user! ', err));
})    
    
    
    


app.listen(PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${PORTE}, sire!` )});