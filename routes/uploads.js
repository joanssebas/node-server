const {Router} = require("express");
const {check} = require("express-validator");
const {
  cargarArchivo,
  actualizarImagen,
  mostrarImagen,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const {coleccionesPermitidas} = require("../helpers");
const {validarArchivoSubir} = require("../middlewares");

const {validarcampos} = require("../middlewares/validar-campos");

const router = Router();

router.post("/", [validarArchivoSubir], cargarArchivo);

router.put(
  "/:coleccion/:id",
  [
    validarArchivoSubir,
    check("id", "El id ddebe ser mongo ID").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarcampos,
  ],
  // actualizarImagen
  actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "El id ddebe ser mongo ID").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validarcampos,
  ],
  mostrarImagen
);

module.exports = router;
