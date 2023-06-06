import {
  MENSAJE_EXITOSO,
  LIMPIAR_ALERTA,
  MENSAJE_FALLIDO,
  LOGIN_EXITO,
  USUARIO_AUTENTICADO,
  CERRAR_SESION,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case LIMPIAR_ALERTA:
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
      };
    case CERRAR_SESION:
      localStorage.removeItem("token");
      return {
        ...state,
        usuario: null,
        token: null,
        autenticado: false,
      };
    default:
      return;
  }
};
