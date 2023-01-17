const {response, request} = require("express");

const usuariosGet = (req = request, res = response) => {
  const query = req.query;

  res.json({message: "get api - controlador", query});
};

const usuariosPut = (req, res) => {
  const {id} = req.params;
  res.json({message: "put api -controlador", id});
};

const usuariosPost = (req, res) => {
  const {nombre, edad} = req.body;
  res.json({message: "post api cont", nombre, edad});
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
