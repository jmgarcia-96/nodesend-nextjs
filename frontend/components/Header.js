import Link from "next/link";
import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { autenticado, usuario, usuarioAutenticado, cerrarSesion } =
    useContext(AuthContext);

  useEffect(() => {});
  return (
    <header className="py-8 flex flex-col md:flex-row items-center justify-between mx-8">
      <Link href="/">
        <img className="w-64 mb-8 md:mb-0" src="logo.svg" />
      </Link>

      <div>
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
      </div>
    </header>
  );
};

export default Header;
