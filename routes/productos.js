const {Router} = require("express");
const {check} = require("express-validator");
const {login} = require("../controllers/auth");
const {
  crearProducto,
  obtenerProductos,
  obtenerProductoPorId,
  actualizarProducto,
  borrarProducto,
} = require("../controllers/productos");
const {
  existeCategoriaPorId,
  existeProductoPorId,
} = require("../helpers/db-validators");
const {validarJWT, validarcampos, esAdminRole} = require("../middlewares");

const router = Router();

//obtener todas las categorias - publico
router.get("/", obtenerProductos);

//obtener  categorias por id - publico

router.get(
  "/:id",
  [
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarcampos,
  ],
  obtenerProductoPorId
);

//crear  categorias por id - privado cualquier rol

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("categoria", "La categoria no es un id de mongo Valido").isMongoId(),
    check("categoria").custom(existeCategoriaPorId),

    validarcampos,
  ],
  crearProducto
);

//actualizar  categorias por id - privado cualquier rol

router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "no es un mongo id valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarcampos,
  ],
  actualizarProducto
);

//borrar  categorias por id - privado solo admins pueden

router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "no es un id de mongo valido").isMongoId(),
    check("id").custom(existeProductoPorId),
    validarcampos,
  ],
  borrarProducto
);

module.exports = router;
