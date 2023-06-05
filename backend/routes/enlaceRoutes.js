import express from "express";
import {
  nuevoEnlace,
  obtenerEnlace,
} from "../controllers/enlaceControllers.js";
import checkAuth from "../middlewares/checkAuth.js";
import { nuevoEnlaceValidation } from "../validations/enlace.validation.js";

const router = express.Router();

router.post("/", nuevoEnlaceValidation(), checkAuth, nuevoEnlace);
router.get("/:url", checkAuth, obtenerEnlace);

export default router;
