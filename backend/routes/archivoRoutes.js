import express from "express";
import {
  descargarArchivo,
  eliminarArchivo,
  subirArchivo,
} from "../controllers/archivoControllers.js";

const router = express.Router();

router.post("/", subirArchivo);
router.get("/:archivo", descargarArchivo, eliminarArchivo);

export default router;
