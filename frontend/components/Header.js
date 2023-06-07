import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import AppContext from "../context/AppProvider";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { usuario, cerrarSesion, cargando } = useContext(AuthContext);
  const { limpiarState } = useContext(AppContext);

  const redireccionar = () => {
    router.push("/");
    limpiarState();
  };

  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between mx-8">
      <img
        onClick={() => redireccionar()}
        className="w-64 mb-8 md:mb-0 cursor-pointer"
        src="/logo.svg"
      />

      <div>
        {cargando ? (
          <>
            <div className="sk-circle">
              <div className="sk-circle1 sk-child"></div>
              <div className="sk-circle2 sk-child"></div>
              <div className="sk-circle3 sk-child"></div>
              <div className="sk-circle4 sk-child"></div>
              <div className="sk-circle5 sk-child"></div>
              <div className="sk-circle6 sk-child"></div>
              <div className="sk-circle7 sk-child"></div>
              <div className="sk-circle8 sk-child"></div>
              <div className="sk-circle9 sk-child"></div>
              <div className="sk-circle10 sk-child"></div>
              <div className="sk-circle11 sk-child"></div>
              <div className="sk-circle12 sk-child"></div>
            </div>
          </>
        ) : (
          <>
            {usuario ? (
              <div className="flex items-center">
                <p className="mr-2">Hola {usuario.nombre}</p>
                <button
                  type="button"
                  className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                  onClick={cerrarSesion}
                >
                  Cerrar Sesión
                </button>
              </div>
            ) : (
              <>
                <Link
                  className="bg-red-500 px-5 py-3 rounded-lg text-white font-bold uppercase mr-2"
                  href="/login"
                >
                  Iniciar Sesión
                </Link>
                <Link
                  className="bg-black px-5 py-3 rounded-lg text-white font-bold uppercase"
                  href="/crearCuenta"
                >
                  Crear Cuenta
                </Link>
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
