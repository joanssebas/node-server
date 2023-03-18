const {v4: uuidv4} = require("uuid");
const path = require("path");

const subirArchivo = (
  files,
  extensionesValidas = ["png", "jpg", "jpeg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const {archivo} = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];

    console.log(extension);

    //validar la extension
    // const extensionesValidas =

    if (!extensionesValidas.includes(extension)) {
      return reject(
        `La extension ${extension} no es una extension tipo ${extensionesValidas}`
      );
      //   res.status(400).json({
      //     msg: ,
      //   });
    }

    const nombreTemp = uuidv4() + "." + extension;

    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nombreTemp);
    console.log("upload path ", uploadPath);

    archivo.mv(uploadPath, (err) => {
      if (err) {
        console.log(err);
        // return res.status(500).json({err});
        return reject(err);
      }

      //   res.json({msg: "File uploaded to " + uploadPath});
      //   resolve(uploadPath);
      resolve(nombreTemp);
    });
  });
};

module.exports = {
  subirArchivo,
};
