import { useDropzone } from "react-dropzone";
import clienteAxios from "../config/axios";

import React, { useCallback, useContext } from "react";
import AppContext from "../context/AppProvider";
import AuthContext from "../context/AuthProvider";
import Formulario from "./Formulario";

const Dropzone = () => {
  const { mostrarAlerta, subirArchivo, cargando, crearEnlace } =
    useContext(AppContext);

  const { usuario, autenticado } = useContext(AuthContext);

  const onDropAccepted = useCallback(async (acceptedFiles) => {
    subirArchivo(acceptedFiles);
  }, []);

  const onDropRejected = () => {
    mostrarAlerta(
      "No se pudo subir el archivo. El límite es 1MB. Obtén una cuenta gratis para subir archivos más grandes.",
      true
    );
  };

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDropAccepted,
      onDropRejected,
      maxSize: autenticado ? 1000000000000 : 1000000,
    });

  const archivos = acceptedFiles.map((archivo) => (
    <li
      key={archivo.lastModified}
      className="bg-white flex-1 p-3 mb-4 shadow-lg rounded"
    >
      <p className="font-bold text-xl break-all">{archivo.path}</p>
      <p className="text-sm text-gray-500">
        {(archivo.size / Math.pow(1024, 2)).toFixed(2)} MB
      </p>
    </li>
  ));

  return (
    <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-400 border-2 bg-gray-100 px-4">
      {acceptedFiles.length > 0 ? (
        <div className="mt-10 w-full">
          <h4 className="text-2xl font-bold text-center mb-3">Archivos</h4>
          <ul>{archivos}</ul>

          {autenticado && <Formulario />}

          {cargando ? (
            <p className="my-10 text-center text-gray-600">
              Subiendo Archivo...
            </p>
          ) : (
            <button
              type="button"
              className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
              onClick={() => crearEnlace()}
            >
              Crear Enlace
            </button>
          )}
        </div>
      ) : (
        <div {...getRootProps({ className: "dropzone w-full py-32" })}>
          <input className="h-100 bg-gray-100" {...getInputProps} />

          {isDragActive ? (
            <p className="text-2xl text-center text-gray-600">
              Suelta el archivo
            </p>
          ) : (
            <>
              <div className="text-center">
                <p className="text-2xl text-center text-gray-600">
                  Selecciona un archivo y arrastralo aquí
                </p>
                <button
                  className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800"
                  type="button"
                >
                  Selecciona archivos para subir
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropzone;
