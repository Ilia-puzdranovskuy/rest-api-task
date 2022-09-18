const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Library API",
			version: "1.0.0",
			description: "A simple Express Library API",
		},
    components: {
      securitySchemes: {
          Authorization: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
              value: "Bearer <JWT token here>"
          }
      }
  },
		servers: [
			{
				url: "http://localhost:3000",
			},
		],
    
	},
	apis: ["./routes/*.js"],  
};

const swaggerUiOptions = {
  explorer: true
};

const specs = swaggerJsDoc(options);

const app = express();

let authRouter = require('./routes/auth');
let itemRouter = require('./routes/items');
let swagerRouter = require('./routes/swagger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use("/api", authRouter);
app.use("/api", itemRouter);
app.use( swagerRouter);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs,swaggerUiOptions));

let start = async () =>{
  await mongoose.connect('mongodb+srv://board:1111@cluster0.4ej5egb.mongodb.net/');
  app.listen(3000, () => {
    console.log(`Server work!`)
  })
  }
  
start();