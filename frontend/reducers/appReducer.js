import {
  MENSAJE_EXITOSO,
  OCULTAR_ALERTA,
  MENSAJE_FALLIDO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO,
  CREAR_ENLACE_EXITO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../types";
export default (state, action) => {
  switch (action.type) {
    case OCULTAR_ALERTA:
    case MENSAJE_EXITOSO:
    case MENSAJE_FALLIDO:
      return {
        ...state,
        alerta: action.payload,
      };
    case SUBIR_ARCHIVO:
      return {
        ...state,
        cargando: true,
      };
    case SUBIR_ARCHIVO_EXITO:
      return {
        ...state,
        cargando: null,
        nombre: action.payload.nombre,
        nombre_original: action.payload.nombre_original,
        alerta: action.payload.alerta,
      };
    case CREAR_ENLACE_EXITO:
      return {
        ...state,
        url: action.payload,
      };
    case LIMPIAR_STATE:
      return {
        ...state,
        alerta: null,
        nombre: "",
        nombre_original: "",
        cargando: null,
        descargas: 1,
        password: "",
        autor: null,
        url: "",
      };
    case AGREGAR_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case AGREGAR_DESCARGAS:
      return {
        ...state,
        descargas: action.payload,
      };
    default:
      return state;
  }
};
