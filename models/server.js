const express = require("express");
const cors = require("cors");
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";

    //lectura y parseo del codigo
    this.app.use(express.json());

    //middelwares
    this.middelwares();
    //rutas de la aplicacion
    this.routes();
  }

  middelwares() {
    //cors
    this.app.use(cors());

    //directorio pubnlico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
  }

  listener() {
    this.app.listen(this.port, () =>
      console.log("servidor corriendo en ", this.port)
    );
  }
}

module.exports = Server;
