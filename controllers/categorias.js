const {response} = require("express");
const {Categoria} = require("../models");

//obtener categorias - paginado - total - populate

const obtenerCategorias = async (req, res = response) => {
  const query = {estado: true};

  const {limite = 10, desde = 0} = req.query;

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({total, categorias});
};

// obtener categoria - populate

const obtenerCategoriaPorId = async (req, res = response) => {
  const {id} = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");

  // if (!categoria) {
  //   return res.status(404).json({
  //     msg: "no se encontro una categoria con el id indicado",
  //   });
  // }

  res.json(categoria);
};

const crearCategoria = async (req, res = response) => {
  const nombre = req.body.nombre.toUpperCase();

  const categoriaDB = await Categoria.findOne({nombre});

  if (categoriaDB) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDB.nombre} ya existe`,
    });
  }

  //generar la data a guardar

  const data = {
    nombre,
    usuario: req.usuario._id,
  };

  const categoria = new Categoria(data);

  //GUARDAR DB

  await categoria.save();

  res.status(201).json(categoria);
};

// actualizar categoria

const actualizarCategoria = async (req, res = response) => {
  const {id} = req.params;
  const {estado, usuario, ...data} = req.body;

  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;
  const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true});

  res.json(categoria);
};

// borrar categoria

const borrarCategoria = async (req, res = response) => {
  const {id} = req.params;

  const categoria = await Categoria.findByIdAndUpdate(
    id,
    {estado: false},
    {new: true}
  );

  res.json(categoria);
};

module.exports = {
  crearCategoria,
  obtenerCategorias,
  obtenerCategoriaPorId,
  actualizarCategoria,
  borrarCategoria,
};
