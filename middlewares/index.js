const validarJWT = require("../middlewares/validar.jwt");
const esAdminRole = require("../middlewares/validar-roles");
const validarcampos = require("../middlewares/validar-campos");
const tieneRol = require("../middlewares/validar-roles");
const validarArchivo = require("./validar-archivo");

module.exports = {
  ...validarJWT,
  ...esAdminRole,
  ...validarcampos,
  ...tieneRol,
  ...validarArchivo,
};
