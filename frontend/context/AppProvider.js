import { createContext, useReducer } from "react";
import appReducer from "../reducers/appReducer";
import {
  OCULTAR_ALERTA,
  MENSAJE_EXITOSO,
  MENSAJE_FALLIDO,
  SUBIR_ARCHIVO_EXITO,
  SUBIR_ARCHIVO_ERROR,
  CREAR_ENLACE_EXITO,
  CREAR_ENLACE_ERROR,
  SUBIR_ARCHIVO,
  LIMPIAR_STATE,
  AGREGAR_PASSWORD,
  AGREGAR_DESCARGAS,
} from "../types";
import clienteAxios from "../config/axios";
import tokenAuth from "../config/tokenAuth";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const initialState = {
    alerta: null,
    nombre: "",
    nombre_original: "",
    cargando: null,
    descargas: 1,
    password: "",
    autor: null,
    url: "",
  };

  const [state, dispatch] = useReducer(appReducer, initialState);

  const mostrarAlerta = (msg, error) => {
    dispatch({
      type: error ? MENSAJE_FALLIDO : MENSAJE_EXITOSO,
      payload: { msg, error },
    });

    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  const subirArchivo = async (acceptedFiles) => {
    dispatch({
      type: SUBIR_ARCHIVO,
    });

    try {
      const formData = new FormData();
      formData.append("archivo", acceptedFiles[0]);

      const respuesta = await clienteAxios.post("/api/archivos", formData);
      dispatch({
        type: SUBIR_ARCHIVO_EXITO,
        payload: {
          nombre: respuesta.data.archivo,
          nombre_original: acceptedFiles[0].path,
          alerta: { msg: "Archivo subido correctamente", error: false },
        },
      });
    } catch (error) {
      dispatch({
        type: MENSAJE_FALLIDO,
        payload: { msg: error.response.data.msg, error: true },
      });
    }
    setTimeout(() => {
      dispatch({
        type: OCULTAR_ALERTA,
      });
    }, 5000);
  };

  const crearEnlace = async () => {
    tokenAuth(localStorage.getItem("token"));
    const data = {
      nombre: state.nombre,
      nombre_original: state.nombre_original,
      descargas: state.descargas,
      password: state.password,
      autor: state.autor,
    };

    try {
      const respuesta = await clienteAxios.post("/api/enlaces", data);
      dispatch({
        type: CREAR_ENLACE_EXITO,
        payload: respuesta.data.msg,
      });
    } catch (error) {
      dispatch({
        type: MENSAJE_FALLIDO,
        payload: { msg: error.response.data.msg, error: true },
      });
    }
  };

  const descargarArchivo = async (archivo) => {
    try {
      const respuesta = await clienteAxios(`/api/archivos/${archivo}`);
    } catch (error) {
      dispatch({
        type: MENSAJE_FALLIDO,
        payload: { msg: error.response.data.msg, error: true },
      });
    }
  };

  const limpiarState = () => {
    dispatch({
      type: LIMPIAR_STATE,
    });
  };

  const agregarPassword = (password) => {
    dispatch({
      type: AGREGAR_PASSWORD,
      payload: password,
    });
  };

  const agregarDescargas = (descargas) => {
    dispatch({
      type: AGREGAR_DESCARGAS,
      payload: descargas,
    });
  };

  return (
    <AppContext.Provider
      value={{
        alerta: state.alerta,
        nombre: state.nombre,
        nombre_original: state.nombre_original,
        cargando: state.cargando,
        descargas: state.descargas,
        password: state.password,
        autor: state.autor,
        url: state.url,
        mostrarAlerta,
        subirArchivo,
        crearEnlace,
        descargarArchivo,
        limpiarState,
        agregarPassword,
        agregarDescargas,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider };

export default AppContext;
