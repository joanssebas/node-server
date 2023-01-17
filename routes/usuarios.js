const {Router} = require("express");
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

router.post("/", usuariosPost);

router.delete("/", usuariosDetele);

router.patch("/", usuariosPatch);

module.exports = router;
