import Enlace from "../models/Enlace.js";
import shortid from "shortid";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const nuevoEnlace = async (req, res) => {
  const errores = validationResult(req);
  console.log(errores);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { nombre_original, nombre } = req.body;

  const enlace = new Enlace();
  enlace.url = shortid.generate();
  enlace.nombre = nombre;
  enlace.nombre_original = nombre_original;

  // Si el usuario esta autenticado
  if (req.usuario) {
    const { password, descargas } = req.body;

    // Asignar a enlace el número de descargas
    if (descargas) {
      enlace.descargas = descargas;
    }

    // asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10);
      enlace.password = await bcrypt.hash(password, salt);
    }

    // Asignar el autor
    enlace.autor = req.usuario.id;
  }

  // Almacenar en la BD
  try {
    await enlace.save();
    return res.json({ msg: `${enlace.url}` });
  } catch (error) {
    console.log(error);
  }
};

const todosEnlaces = async (req, res) => {
  try {
    const enlaces = await Enlace.find({}).select("url -_id");
    res.json(enlaces);
  } catch (error) {
    console.log(error);
  }
};

const obtenerEnlace = async (req, res, next) => {
  const { url } = req.params;

  // Verificar si existe el enlace
  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: "Ese Enlace no existe" });
    return next();
  }

  // Si el enlace existe
  res.json({ archivo: enlace.nombre });

  next();
};

const tienePassword = async (req, res, next) => {
  // console.log(req.params.url);
  const { url } = req.params;

  console.log(url);

  // Verificar si existe el enlace
  const enlace = await Enlace.findOne({ url });

  if (!enlace) {
    res.status(404).json({ msg: "Ese Enlace no existe" });
    return next();
  }

  if (enlace.password) {
    return res.json({ password: true, enlace: enlace.url });
  }

  next();
};

export { nuevoEnlace, obtenerEnlace, todosEnlaces, tienePassword };
