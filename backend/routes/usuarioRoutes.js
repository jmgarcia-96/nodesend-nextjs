import express from "express";
import { autenticar, registrar } from "../controllers/usuarioController.js";
import {
  userLoginValidate,
  userRegisterValidate,
} from "../validations/user.validation.js";

const router = express.Router();

router.post("/registrar", userRegisterValidate(), registrar);
router.post("/login", userLoginValidate(), autenticar);

export default router;
