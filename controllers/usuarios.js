const {response, request} = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const usuariosGet = async (req = request, res = response) => {
  // const query = req.query;
  const query = {estado: true};

  const {limite = 10, desde = 0} = req.query;
  // const usuarios = await Usuario.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({total, usuarios});
};

const usuariosPut = async (req, res) => {
  const {id} = req.params;

  const {password, google, correo, _id, ...resto} = req.body;

  //validar con BD

  if (password) {
    //encryptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json({usuario});
};

const usuariosPost = async (req, res) => {
  const {nombre, correo, password, rol} = req.body;

  const usuario = new Usuario({nombre, correo, password, rol});

  //validar que el correo sea valido

  //encryptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar user
  await usuario.save();
  res.json({message: "post api cont", usuario});
};

const usuariosDetele = async (req, res) => {
  const {id} = req.params;

  //borrar de la base de datos
  // const usuario = await Usuario.findByIdAndDelete(id);

  //borrarlo cambiandole el estado
  const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

  //ver el usuario autenticado que tiene el token
  const usuarioAutenticado = req.usuario;

  res.json({usuario});
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
