const { Router } = require("express");
const router = Router();
const {
  crearMascota,
  obtenerTodasMascotas,
  obtenerMascota,
  modificarMascota,
  eliminarMascota,
} = require("../controllers");
//CRUDE
router.post("/mascotas", crearMascota);
router.get("/mascotas", obtenerTodasMascotas);
router.get("/mascotas/:idMascota", obtenerMascota);
router.put("/mascotas/:idMascota", modificarMascota);
router.delete("/mascotas/:idMascota", eliminarMascota);

module.exports = router;
