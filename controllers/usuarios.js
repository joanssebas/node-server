const {response, request} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const {check, validationResult} = require("express-validator");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;

  res.json({message: "get api - controlador", query});
};

const usuariosPut = (req, res) => {
  const {id} = req.params;
  res.json({message: "put api -controlador", id});
};

const usuariosPost = async (req, res) => {
  const {nombre, correo, password, rol} = req.body;

  const usuario = new Usuario({nombre, correo, password, rol});

  //validar que el correo sea valido
  var error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error,
    });
  }

  //verificar si el correo existe
  const existeEmail = await Usuario.findOne({correo});

  if (existeEmail) {
    return res.status(400).json({
      msg: "el correo ya esta registrado",
    });
  }

  //encryptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar user
  await usuario.save();
  res.json({message: "post api cont", usuario});
};

const usuariosDetele = (req, res) => {
  res.json({message: "delete api cont"});
};

const usuariosPatch = (req, res) => {
  res.json({message: "patch api"});
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDetele,
  usuariosPatch,
};
