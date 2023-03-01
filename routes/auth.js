const {Router} = require("express");
const {check} = require("express-validator");
const {login} = require("../controllers/auth");
const {validarcampos} = require("../middlewares/validar-campos");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "el correo es obligatorio").isEmail(),
    check("password", "la contraseña es obligatoria ").not().isEmpty(),
    validarcampos,
  ],
  login
);

module.exports = router;
