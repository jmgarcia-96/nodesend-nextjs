import express from "express";
import {
  nuevoEnlace,
  obtenerEnlace,
  tienePassword,
  todosEnlaces,
} from "../controllers/enlaceControllers.js";
import checkAuth from "../middlewares/checkAuth.js";
import { nuevoEnlaceValidation } from "../validations/enlace.validation.js";

const router = express.Router();

router.post("/", nuevoEnlaceValidation(), nuevoEnlace);

router.get("/", todosEnlaces);

router.get("/:url", tienePassword, obtenerEnlace);

export default router;
