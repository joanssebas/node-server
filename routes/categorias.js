const {Router} = require("express");
const {check} = require("express-validator");
const {login} = require("../controllers/auth");
const {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");
const {existeCategoriaPorId} = require("../helpers/db-validators");
const {validarJWT, validarcampos, esAdminRole} = require("../middlewares");

const router = Router();

//obtener todas las categorias - publico
router.get("/", obtenerCategorias);

//obtener  categorias por id - publico

router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarcampos,
  ],
  obtenerCategoriaPorId
);

//crear  categorias por id - privado cualquier rol

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarcampos,
  ],
  crearCategoria
);

//actualizar  categorias por id - privado cualquier rol

router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "El nombre de la categoria es obligatorio").not().isEmpty(),
    check("id").custom(existeCategoriaPorId),
    validarcampos,
  ],
  actualizarCategoria
);

//borrar  categorias por id - privado solo admins pueden

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeCategoriaPorId),
    validarcampos,
  ],
  borrarCategoria
);

module.exports = router;
