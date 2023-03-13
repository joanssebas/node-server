const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;
    this.paths = {
      usuarios: "/api/usuarios",
      auth: "/api/auth",
      categorias: "/api/categorias",
      productos: "/api/productos",
      buscar: "/api/buscar",
    };

    //forma antigua
    // this.usuariosPath = "/api/usuarios";
    // this.authPath = "/api/auth";
    // this.cate = "/api/categorias";

    //lectura y parseo del codigo
    this.app.use(express.json());

    //connect to database
    this.connectDB();

    //middelwares
    this.middelwares();
    //rutas de la aplicacion
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }

  middelwares() {
    //cors
    this.app.use(cors());

    //directorio pubnlico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
  }

  listener() {
    this.app.listen(this.port, () =>
      console.log("servidor corriendo en ", this.port)
    );
  }
}

module.exports = Server;
