const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()
const register = require('./routes/registerRoute')
const users  = require('./routes/usersRoute');
const category = require('./routes/catergoryRoute');
const collection = require('./routes/collectionRoute')


app.use(express.json());
app.use(bodyParser.json());
app.use(cors({}))
app.use(express.static('collectionUploads'))


app.use((req, res, next) => {
    console.log(`Requests => ${req.method.toUpperCase()}  http://locahost:3000${req.url} Status:${res.statusCode} `)
    next()
    })

let url = process.env.DATABASEURL
async function connect() {
    try {
      await mongoose.connect(url);
      console.log('Connected to MongoDB database.');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
  connect();

app.use('/api',register)
app.use('/api',users)
app.use('/api',category)
app.use('/api',collection)


app.listen(process.env.PORT , (err) => {
    if (err) throw Error('somthing went wrong in connection',err.message)
    console.log(`server is listing on ${process.env.PORT}`)
})
