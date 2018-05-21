require('dotenv').config();

const express = require('express')
    , app = express()
    , massive = require('massive');
    
const {
    PORTE,
    CONNECTION_STRING
} = process.env;

app.use(express.json());

massive(CONNECTION_STRING).then( db => {
    app.set('db', db)
});







app.listen(PORTE, () => { console.log(`Ye olde server doth lend an ear at porte ${PORTE}, sire!` )})