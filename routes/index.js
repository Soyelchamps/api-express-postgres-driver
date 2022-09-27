const { Router, application } = require("express");
const router = Router();

router.get("/users", function (req, res) {
  console.log(req.body);
  res.json({ message: "Hola soy la respuesta", id: "222", name: "Carlos" });
});

module.exports = router;
