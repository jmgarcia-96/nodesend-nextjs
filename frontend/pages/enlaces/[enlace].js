import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";
import AppContext from "../../context/AppProvider";
import Alerta from "../../components/Alerta";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const respuesta = await clienteAxios(`/api/enlaces/${enlace}`);
  return {
    props: {
      enlace: respuesta.data,
    },
  };
}

export async function getServerSidePaths() {
  try {
    const respuesta = await clienteAxios("/api/enlaces");
    return {
      paths: respuesta.data.enlaces.map((enlace) => ({
        params: {
          enlace: enlace.url,
        },
      })),
      fallback: false,
    };
  } catch (error) {
    console.log(error.response.data.msg);
  }
}

export default ({ enlace }) => {
  const [tienePassword, setTienePassword] = useState(enlace.password);
  const [password, setPassword] = useState("");

  const { mostrarAlerta, alerta } = useContext(AppContext);

  const verificarPassword = async (e) => {
    e.preventDefault();

    const data = {
      password,
    };

    try {
      const respuesta = await clienteAxios.post(
        `/api/enlaces/${enlace.enlace}`,
        data
      );
      setTienePassword(respuesta.data.password);
    } catch (error) {
      mostrarAlerta(error.response.data.msg, true);
    }
  };
  return (
    <Layout>
      {tienePassword ? (
        <>
          <p className="text-center">
            Este enlace está protegido por un password, colócalo a continuación
          </p>

          <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
              {alerta && <Alerta />}
              <form
                className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => verificarPassword(e)}
              >
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-black text-sm font-bold mb-2"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                  focus:outline-none focus:shadow-outline"
                    placeholder="Password del archivo"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <input
                  type="submit"
                  className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                  value="Validar Password"
                />
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl text-center text-gray-700">
            Descarga tu archivo
          </h1>
          <div className="flex items-center justify-center mt-10">
            <a
              href={`${process.env.backendURL}/api/archivos/${enlace.enlace}`}
              className="bg-red-500 text-center px-10 py-3 rounded uppercase text-white font-bold cursor-pointer"
              download
            >
              Aquí
            </a>
          </div>
        </>
      )}
    </Layout>
  );
};
