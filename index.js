const express = require("express"); //Importamos la libreria express
const app = express(); //Inicializamos la libreria en una constante
const router = require("./routes");

// Middlewares --> Obtienen los datos de la petición antes de que lleguen a nuestra funcion.
app.use(express.json()); //Permitimos comunicarmos a traves de formato JSON
app.use(express.urlencoded({ extended: false })); //Permitimos recibir datos de codificacion de formularios

//Utilizamos las rutas
app.use(router);

app.listen(3000, (error) => {
  error ? console.log(error) : console.log("Server running");
});

// importacion express
//module.exports ={express, other}
