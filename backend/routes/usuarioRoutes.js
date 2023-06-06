import express from "express";
import {
  autenticar,
  registrar,
  usuarioAutenticado,
} from "../controllers/usuarioController.js";
import {
  userLoginValidate,
  userRegisterValidate,
} from "../validations/user.validation.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/registrar", userRegisterValidate(), registrar);
router.post("/login", userLoginValidate(), autenticar);
router.get("/perfil", checkAuth, usuarioAutenticado);

export default router;
