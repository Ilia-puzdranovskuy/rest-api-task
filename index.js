const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

let authRouter = require('./routes/auth');
let itemRouter = require('./routes/items');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use("/api", authRouter);
app.use("/api", itemRouter);


let start = async () =>{
  await mongoose.connect('mongodb+srv://board:1111@cluster0.4ej5egb.mongodb.net/');
  app.listen(3000, () => {
    console.log(`Server work!`)
  })
  }
  
start();