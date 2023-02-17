const {Router} = require("express");
const {check} = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDetele,
  usuariosPatch,
} = require("../controllers/usuarios");

const router = Router();

router.get("/", usuariosGet);

router.put("/:id", usuariosPut);

router.post(
  "/",
  [
    check("correo", "el correo no es un correo correcto").isEmail(),
    check("nombre", "el nombre es obligatorio").not().isEmpty(),
    check(
      "password",
      "el password es obligatorio y debe contener mas de 6 letras"
    ).isLength({
      min: 6,
    }),
    check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
  ],
  usuariosPost
);

router.delete("/", usuariosDetele);

router.patch("/", usuariosPatch);

module.exports = router;
