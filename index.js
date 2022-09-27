const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("Hola Mundo");
});

app.listen(3000, (error) => {
  error ? console.log(error) : console.log("Server running");
});
// importacion express
//module.exports ={express, other}
