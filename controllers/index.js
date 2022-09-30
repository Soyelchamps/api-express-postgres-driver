const connect = require("../database");

// req ---> recibe los datos
// res ---> responde al cliente
//req.paramas ---> Recibimos datos que llegan por la URL pero son obligatorios
//req.query --->Recibimos los datos que llegan por la URL pero son opcionales
//req.body ---> Recibimos los datos que llegan por el body

const crearMascota = async (req, res) => {
  const { nombre, tipo, raza, edad, propietario_id } = req.body;
  try {
    const dbResponse = await connect.query(
      "INSERT INTO mascotas (nombre, tipo, raza, edad, propietario_id) VALUES ( $1, $2, $3, $4, $5 )",
      [nombre, tipo, raza, edad, propietario_id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Mascota creada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear la mascota en este momento",
      });
    }
  } catch (error) {
    res.status(409).send({
      error,
    });
  }
};

const obtenerTodasMascotas = async (req, res) => {
  try {
    const dbResponse = await connect.query("SELECT * FROM mascotas");
    res.status(200).send({
      data: dbResponse.rows,
    });
    console.log(dbResponse.rows);
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

const obtenerMascota = async (req, res) => {
  const id = req.params.idMascota;
  try {
    const dbResponse = await connect.query(
      "SELECT * FROM mascotas WHERE id_mascota = $1",
      [id]
    );
    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        data: dbResponse.rows,
      });
      console.log(dbResponse.rows);
    } else {
      res.status(404).send({
        message: "Mascota no fue encontrada",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};

const modificarMascota = (req, res) => {
  console.log("modificar mascota");
};

const eliminarMascota = (req, res) => {
  console.log("eliminar mascota");
};

module.exports = {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
};
