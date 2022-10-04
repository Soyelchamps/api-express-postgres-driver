const connect = require("../database");
const { createToken } = require("../utils");

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

const modificarMascota = async (req, res) => {
  const id = req.params.idMascota;
  const { nombre, tipo, raza, edad, propietario_id } = req.body;

  try {
    const dbResponse = await connect.query(
      `
    UPDATE mascotas
      SET nombre = $1,
      tipo = $2,
      raza = $3,
      edad = $4,
      propietario_id = $5
    WHERE id_mascota = $6
    `,
      [nombre, tipo, raza, edad, propietario_id, id]
    );

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Mascota Modificada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo modifcar la mascota en este momento",
      });
    }
  } catch (error) {
    res.status(500).send({
      error,
    });
  }
};

const eliminarMascota = async (req, res) => {
  const id = req.params.idMascota;
  try {
    const dbResponse = await connect.query(
      `DELETE FROM mascotas WHERE id_mascota = $1`,
      [id]
    );

    if (dbResponse.rowCount > 0) {
      res.status(200).send({
        message: "Mascota eliminada",
      });
    } else {
      res.status(409).send({
        message: "No se pudo eliminar la mascota en este momento.",
      });
    }
  } catch (error) {
    res.status(400).send({
      error,
    });
  }
};

//Registreo
const registerController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const dbResponse = await connect.query(
      "INSERT INTO admins(email, password) VALUES($1, crypt($2, gen_salt('bf')))",
      [email, password]
    );

    if (dbResponse.rowCount > 0) {
      res.status(201).send({
        message: "Admin creado",
      });
    } else {
      res.status(409).send({
        message: "No se pudo crear el admin.",
      });
    }
  } catch (error) {
    res.status(409).send({
      error,
    });
  }
};
const loginController = async (req, res) => {
  const { email, bodyPassword } = req.body;

  try {
    const dbResponse = await connect.query(
      "SELECT * FROM admins WHERE email = $1 AND password = crypt($2, password)",
      [email, bodyPassword]
    );

    if (dbResponse.rowCount > 0) {
      const datos = {
        id: dbResponse.rows(0).id,
        email: dbResponse.rows(0).email,
      };
      const token = createToken(data);
      res.status(200).send({
        data: dbResponse.rows,
      });
    } else {
      res.status(404).send({
        message: "Usuario o contraseña incorrectos.",
      });
    }
  } catch (error) {
    res.status(404).send({
      error,
    });
  }
};
module.exports = {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
  loginController,
  registerController,
};
