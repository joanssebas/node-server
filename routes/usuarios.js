const {Router} = require("express");
const {check} = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDetele,
  usuariosPatch,
} = require("../controllers/usuarios");
const {validarcampos} = require("../middlewares/validar-campos");
const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "no es un Id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    check("rol").custom(esRoleValido),
    validarcampos,
  ],
  usuariosPut
);

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
    check("rol").custom(esRoleValido),
    check("correo").custom(emailExiste),
    // check("rol", "No es un rol valido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
    validarcampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "no es un Id valido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarcampos,
  ],
  usuariosDetele
);

router.patch("/", usuariosPatch);

module.exports = router;
