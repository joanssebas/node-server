const express = require("express");
const cors = require("cors");
const {dbConnection} = require("../database/config");
class Server {
  constructor() {
    this.app = express();

    this.port = process.env.PORT;
    this.usuariosPath = "/api/usuarios";
    this.authPath = "/api/auth";

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
    this.app.use(this.usuariosPath, require("../routes/usuarios"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listener() {
    this.app.listen(this.port, () =>
      console.log("servidor corriendo en ", this.port)
    );
  }
}

module.exports = Server;
