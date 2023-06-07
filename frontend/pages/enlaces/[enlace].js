import React, { useContext, useState } from "react";
import Layout from "../../components/Layout";
import clienteAxios from "../../config/axios";

export async function getServerSideProps({ params }) {
  const { enlace } = params;
  const respuesta = await clienteAxios(`/api/enlaces/${enlace}`);
  return {
    props: {
      enlace: respuesta.data.archivo,
    },
  };
}

export async function getServerSidePaths() {
  const respuesta = await clienteAxios("/api/enlaces");
  return {
    paths: respuesta.data.enlaces.map((enlace) => ({
      params: {
        enlace: enlace.url,
      },
    })),
    fallback: false,
  };
}

export default ({ enlace }) => {
  const [tienePassword, setTienePassword] = useState(enlace.password);
  console.log(tienePassword);
  return (
    <Layout>
      <h1 className="text-4xl text-center text-gray-700">
        Descarga tu archivo
      </h1>
      <div className="flex items-center justify-center mt-10">
        <a
          href={`${process.env.backendURL}/api/archivos/${enlace}`}
          className="bg-red-500 text-center px-10 py-3 rounded uppercase text-white font-bold cursor-pointer"
          download
        >
          Aquí
        </a>
      </div>
    </Layout>
  );
};
