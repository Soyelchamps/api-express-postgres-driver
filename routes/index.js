const { Router } = require("express");
const router = Router();
const {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
  loginController,
  registerController,
} = require("../controllers");
//CRUDE
router.post("/mascotas", crearMascota);
router.get("/mascotas", obtenerTodasMascotas);
router.get("/mascotas/:idMascota", obtenerMascota);
router.put("/mascotas/:idMascota", modificarMascota);
router.delete("/mascotas/:idMascota", eliminarMascota);

//LOGIN
router.post("/login", loginController);
router.post("/register", registerController);

module.exports = router;
