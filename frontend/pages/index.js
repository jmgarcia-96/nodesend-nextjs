import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import Dropzone from "../components/Dropzone";
import AuthContext from "../context/AuthProvider";
import Link from "next/link";
import AppContext from "../context/AppProvider";
import Alerta from "../components/Alerta";
export default function Home() {
  const { alerta, url } = useContext(AppContext);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        {url ? (
          <>
            <p className="text-center text-2xl ">
              <span className="font-bold text-red-700 text-4xl uppercase">
                Tu URL es:{" "}
              </span>
              {`${process.env.frontendURL}/enlaces/${url}`}
            </p>
            <button
              type="button"
              className="bg-red-500 hover:bg-gray-900 w-full p-2 rounded-lg text-white uppercase font-bold cursor-pointer"
              onClick={() =>
                navigator.clipboard.writeText(
                  `${process.env.frontendURL}/enlaces/${url}`
                )
              }
            >
              Copiar Enlace
            </button>
          </>
        ) : (
          <>
            {alerta && <Alerta />}
            <div className="lg:flex md:shadow-lg p-5 bg-white rounded-lg py-10">
              <Dropzone />

              <div className="md:flex-1 mb-3 mx-2 mt-16 lg:mt-0">
                <h2 className="text-4xl font-sans font-bold text-gray-800 my-4">
                  Compartir archivos de forma sencilla y privada
                </h2>

                <p className="text-lg leading-loose">
                  <span className="text-red-500 font-bold">ReactNodeSend</span>{" "}
                  te permite compartir archivos con cifrado de extremo a extremo
                  y un archivo que es eliminado después de ser descargado. Así
                  que puedes mantener lo que compartes en privado y asegurarte
                  de que tus cosas no permanezcan en línea para siempre.
                </p>
                <Link
                  className="text-red-500 font-bold text-lg hover:text-red-700"
                  href="/crearCuenta"
                >
                  Crea una cuenta para mayores beneficios
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
