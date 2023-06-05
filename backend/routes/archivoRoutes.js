import express from "express";
import checkAuth from "../middlewares/checkAuth.js";
import {
  eliminarArchivo,
  subirArchivo,
} from "../controllers/archivoControllers.js";

const router = express.Router();

router.post("/", checkAuth, subirArchivo);
router.post("/", checkAuth, eliminarArchivo);

export default router;
