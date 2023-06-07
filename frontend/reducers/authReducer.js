import {
  MENSAJE_EXITOSO,
  OCULTAR_ALERTA,
  MENSAJE_FALLIDO,
  LOGIN_EXITO,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
  MOSTRAR_CARGANDO,
  OCULTAR_CARGANDO,
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
    case LOGIN_EXITO:
      localStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
        autenticado: true,
      };
    case USUARIO_AUTENTICADO:
      return {
        ...state,
        usuario: action.payload,
        autenticado: true,
      };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: null,
      };
    case MOSTRAR_CARGANDO:
      return {
        ...state,
        cargando: true,
      };
    case OCULTAR_CARGANDO:
      return {
        ...state,
        cargando: null,
      };
    default:
      return state;
  }
};
