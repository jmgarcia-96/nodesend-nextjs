import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import AppContext from "../context/AppProvider";

const Alerta = ({ validacion, mensaje }) => {
  const { alerta: alertaAuth } = useContext(AuthContext);
  const { alerta: alertaApp } = useContext(AppContext);

  return (
    <div
      className={`my-2 border-l-4 p-4 ${
        alertaAuth?.error || alertaApp?.error || validacion
          ? "bg-red-200  border-red-500 text-red-700 "
          : "bg-green-200 border-green-500 text-green-700"
      } `}
    >
      <p className="font-bold">
        {alertaAuth?.error || alertaApp?.error || validacion
          ? "Error"
          : "Éxito"}
      </p>
      <p>{validacion ? mensaje : alertaAuth?.msg || alertaApp?.msg}</p>
    </div>
  );
};

export default Alerta;
