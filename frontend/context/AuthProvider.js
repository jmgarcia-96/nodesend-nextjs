import { createContext, useEffect, useReducer } from "react";
import authReducer from "../reducers/authReducer";
import {
  CERRAR_SESION,
  OCULTAR_ALERTA,
  LOGIN_EXITO,
  MENSAJE_EXITOSO,
  MENSAJE_FALLIDO,
  USUARIO_AUTENTICADO,
  MOSTRAR_CARGANDO,
  OCULTAR_CARGANDO,
} from "../types";
import clienteAxios from "../config/axios";
import { useRouter } from "next/router";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const initialState = {
    token: typeof window !== "undefined" && localStorage.getItem("token"),
    autenticado:
      typeof window !== "undefined" && localStorage.getItem("token")
        ? true
        : false,
    usuario: null,
    alerta: null,
    cargando: null,
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      usuarioAutenticado();
    }
  }, []);

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
        type: OCULTAR_ALERTA,
        payload: null,
      });
      //   router.push("/login");
    }, 3000);
  };

  const iniciarSesion = async (datos) => {
    dispatch({
      type: MOSTRAR_CARGANDO,
    });
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
      setTimeout(() => {
        dispatch({
          type: OCULTAR_ALERTA,
          payload: null,
        });
      }, 3000);
    }
    dispatch({
      type: OCULTAR_CARGANDO,
    });
  };

  const usuarioAutenticado = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    dispatch({
      type: MOSTRAR_CARGANDO,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const respuesta = await clienteAxios("/api/usuarios/perfil", config);
      if (respuesta.data.usuario) {
        dispatch({
          type: USUARIO_AUTENTICADO,
          payload: respuesta.data.usuario,
        });
      }
    } catch (error) {
      console.log(error);
    }
    dispatch({
      type: OCULTAR_CARGANDO,
    });
  };

  const cerrarSesion = () => {
    dispatch({
      type: CERRAR_SESION,
    });
    router.push("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        autenticado: state.autenticado,
        usuario: state.usuario,
        alerta: state.alerta,
        cargando: state.cargando,
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
