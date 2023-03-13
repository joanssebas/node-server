const {response} = require("express");
const {Producto} = require("../models");

// //obtener categorias - paginado - total - populate

const obtenerProductos = async (req, res = response) => {
  const query = {estado: true};

  const {limite = 10, desde = 0} = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);

  res.json({total, productos});
};

// obtener categoria - populate

const obtenerProductoPorId = async (req, res = response) => {
  const {id} = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");

  // if (!categoria) {
  //   return res.status(404).json({
  //     msg: "no se encontro una categoria con el id indicado",
  //   });
  // }

  res.json(producto);
};

const crearProducto = async (req, res = response) => {
  const {estado, usuario, ...body} = req.body;

  const nombre = body.nombre.toUpperCase();

  const ProductoDB = await Producto.findOne({nombre});
  console.log({ProductoDB});
  if (ProductoDB) {
    return res.status(400).json({
      msg: `El producto ${ProductoDB.nombre} ya existe`,
    });
  }

  //generar la data a guardar

  const data = {
    ...body,
    nombre,
    usuario: req.usuario._id,
  };

  const producto = new Producto(data);

  //GUARDAR DB

  await producto.save();

  res.status(201).json(producto);
};

// // actualizar categoria

const actualizarProducto = async (req, res = response) => {
  const {id} = req.params;
  const {estado, usuario, ...data} = req.body;

  console.log(data);
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }

  data.usuario = req.usuario._id;
  const producto = await Producto.findByIdAndUpdate(id, data, {new: true});

  res.json(producto);
};

// // borrar categoria

const borrarProducto = async (req, res = response) => {
  const {id} = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    {estado: false},
    {new: true}
  );

  res.json(producto);
};

module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  borrarProducto,
};
