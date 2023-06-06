import { createContext, useReducer, useState } from "react";
import authReducer from "../reducers/authReducer";
import {
  CERRAR_SESION,
  LIMPIAR_ALERTA,
  LOGIN_EXITO,
  MENSAJE_EXITOSO,
  MENSAJE_FALLIDO,
  REGISTRO_EXITOSO,
  USUARIO_AUTENTICADO,
} from "../types";
import clienteAxios from "../config/axios";
import { useRouter } from "next/router";
import tokenAuth from "../config/tokenAuth";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const initialState = {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : "",
    autenticado: typeof window !== "undefined" && localStorage.getItem("token"),
    usuario: null,
    alerta: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  const registrarUsuario = async (datos) => {
    try {
      const respuesta = await clienteAxios.post(
        "/api/usuarios/registrar",
        datos
      );
      dispatch({
        type: MENSAJE_EXITOSO,
        payload: { msg: respuesta.data.msg, error: false },
      });
      router.push("/login");
    } catch (error) {
      dispatch({
        type: MENSAJE_FALLIDO,
        payload: { msg: error.response.data.msg, error: true },
      });
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
        payload: null,
      });
      //   router.push("/login");
    }, 3000);
  };

  const iniciarSesion = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/usuarios/login", datos);
      dispatch({
        type: LOGIN_EXITO,
        payload: respuesta.data.token,
      });
    } catch (error) {
      dispatch({
        type: MENSAJE_FALLIDO,
        payload: { msg: error.response.data.msg, error: true },
      });
    }
    setTimeout(() => {
      dispatch({
        type: LIMPIAR_ALERTA,
        payload: null,
      });
    }, 3000);
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }

    try {
      const respuesta = await clienteAxios("/api/usuarios/perfil");
      dispatch({
        type: USUARIO_AUTENTICADO,
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
    }
    // dispatch({
    //   type: USUARIO_AUTENTICADO,
    //   payload: nombre,
    // });
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        alerta: state.alerta,
        registrarUsuario,
        iniciarSesion,
        usuarioAutenticado,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
