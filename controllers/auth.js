const {response} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const {generarJWT} = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const {password, correo} = req.body;

  try {
    //verificar el email
    const usuario = await Usuario.findOne({correo});

    if (!usuario) {
      return res.status(400).json({
        msg: "usuario o contraseña incorrectos",
      });
    }

    //verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "el usuario no esta habilitado",
      });
    }
    //verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, usuario.password);

    if (!validPassword) {
      return res.status(400).json({
        msg: "usuario o contraseña incorrectos",
      });
    }
    //generar jwt
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

const renovarToken = async (req, res = response) => {
  const {usuario} = req;

  //generar jwt
  const token = await generarJWT(usuario.id);

  res.json({
    usuario,
    token,
  });
};

module.exports = {
  login,
  renovarToken,
};
