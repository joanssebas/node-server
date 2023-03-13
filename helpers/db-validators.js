const {Categoria, Producto} = require("../models");
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({rol});
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la BD`);
  }
};

const emailExiste = async (correo) => {
  const existeEmail = await Usuario.findOne({correo});
  //verificar si el correo existe

  if (existeEmail) {
    throw new Error(`El correo electronico ${correo} ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  //verificar si el correo existe

  if (!existeUsuario) {
    throw new Error(`El id ${id} no corresponde a ningun usuario`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  //verificar si el correo existe

  if (!existeCategoria) {
    throw new Error(`El id ${id} no corresponde a ninguna categoria`);
  }
};

const existeProductoPorId = async (id) => {
  const existeProducto = await Producto.findById(id);
  //verificar si el correo existe

  if (!existeProducto) {
    throw new Error(`El id ${id} no corresponde a ninguna categoria`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  existeProductoPorId,
};
