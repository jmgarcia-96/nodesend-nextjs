import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import enlaceRoutes from "./routes/enlaceRoutes.js";
import archivoRoutes from "./routes/archivoRoutes.js";

const app = express();
app.use(express.json());

dotenv.config();

conectarDB();

// Configurar CORS
const whitelist = [process.env.FRONTEND_URL_LH, process.env.FRONTEND_URL_LH_IP];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Error de Cors"));
    }
  },
};

app.use(cors(corsOptions));

// ROUTING
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/enlaces", enlaceRoutes);
app.use("/api/archivos", archivoRoutes);

const PORT = process.env.PORT || 8080;

const servidor = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
