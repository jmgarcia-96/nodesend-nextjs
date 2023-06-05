import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import { validationResult } from "express-validator";

const registrar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  // Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.exists({
    email,
  });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(404).json({ msg: error.message });
  }
  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    await usuario.save();
    res.json({
      msg: "Usuario creado correctamente.",
    });
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;
  // Comprobar si el usuario existe
  const usuario = await Usuario.findOne({
    email,
  });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(400).json({ msg: error.message });
  }
};

export { registrar, autenticar };
