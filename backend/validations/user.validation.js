import { check } from "express-validator";

const userRegisterValidate = (req, res, next) => {
  return [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email no es válido").isEmail(),
    check("password", "El password debe ser de al menos 6 caracteres").isLength(
      { min: 6 }
    ),
  ];
};

const userLoginValidate = (req, res, next) => {
  return [
    check("email", "El email no es válido").isEmail(),
    check("password", "El password debe ser de al menos 6 caracteres").isLength(
      { min: 6 }
    ),
  ];
};

export { userRegisterValidate, userLoginValidate };
