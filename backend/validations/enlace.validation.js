import { check } from "express-validator";

const nuevoEnlaceValidation = (req, res, next) => {
  return [
    check("nombre", "Sube un archivo").not().isEmpty(),
    check("nombre_original", "Sube un archivo").not().isEmpty(),
  ];
};

export { nuevoEnlaceValidation };
