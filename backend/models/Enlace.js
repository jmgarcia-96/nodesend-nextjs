import mongoose from "mongoose";

const enlacesSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    nombre_original: {
      type: String,
      required: true,
    },
    descargas: {
      type: Number,
      default: 1,
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuarios",
      default: null,
    },
    password: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const Enlace = mongoose.model("Enlace", enlacesSchema);

export default Enlace;
