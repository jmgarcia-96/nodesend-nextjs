import express from "express";
import {
  nuevoEnlace,
  obtenerEnlace,
  tienePassword,
  todosEnlaces,
  verificarPassword,
} from "../controllers/enlaceControllers.js";
import { nuevoEnlaceValidation } from "../validations/enlace.validation.js";
import checkAuth from "../middlewares/checkAuth.js";

const router = express.Router();

router.post("/", checkAuth, nuevoEnlaceValidation(), nuevoEnlace);

router.get("/", todosEnlaces);

router.get("/:url", tienePassword, obtenerEnlace);

router.post("/:url", verificarPassword, obtenerEnlace);

export default router;
