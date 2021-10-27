const dotenv =require('dotenv').config();
const mongoose =require('mongoose')
const express =require('express');
const app= express();
const port = process.env.PORT || 8000;

require("./db/conn");
// const User = require("./models/userSchema");
app.use(express.json());
app.use(express.urlencoded({extended:false}))
//we link a router files to make our route 
app.use(require('./router/auth'));

// Middleware
const middleware = (req,res, next) => {
    console.log('Hello from middleware ');
    next();
  }

  app.get('/',(req,res) => {
    res.send('Hello world from the server')
  });

  app.get("/about", middleware,(req, res) => {
      console.log("Hello admin about ")
    res.send('Hello world from the about server')
  });




  app.listen(port, () => console.log(`Server up and running on port ${port}!`));
