import multer from "multer";
import shortid from "shortid";
import fs from "fs";
import Enlace from "../models/Enlace.js";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));

const subirArchivo = async (req, res, next) => {
  const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads"); //Aquí dejé únicamente la ruta hacia la carpeta uploads
    },
    filename: (req, file, cb) => {
      const extension = file.originalname.substring(
        file.originalname.lastIndexOf("."),
        file.originalname.length
      );
      cb(null, `${shortid.generate()}${extension}`);
    },
  });

  const configMulter = {
    limits: { fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024 },
    storage: fileStorage,
  };

  const upload = multer(configMulter).single("archivo");

  upload(req, res, async (error) => {
    console.log(req.file);

    if (!error) {
      res.json({ archivo: req.file.filename });
    } else {
      console.log(error);
      return next();
    }
  });
};

const eliminarArchivo = async (req, res) => {
  try {
    fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    console.log("Archivo Eliminado");
  } catch (error) {
    console.log(error);
  }
};

const descargarArchivo = async (req, res, next) => {
  // Obtiene el enlace
  const { archivo } = req.params;
  const enlace = await Enlace.findOne({ nombre: archivo });

  const archivoDescarga = __dirname + "/../uploads/" + archivo;
  res.download(archivoDescarga);
  // Eliminar el archivo y la entrada de la BD
  // Si las descargas son iguales a 1 - Borrar la entrada y borrar el archivo
  const { descargas, nombre } = enlace;

  if (descargas === 1) {
    // Eliminar el archivo
    req.archivo = nombre;

    // eliminar la entrada de la bd
    await Enlace.findOneAndRemove(enlace.id);
    next();
  } else {
    // si las descargas son > a 1 - Restar 1
    enlace.descargas--;
    await enlace.save();
  }
};

export { subirArchivo, eliminarArchivo, descargarArchivo };
