import React, { useContext } from "react";
import AuthContext from "../context/AuthProvider";

const Alerta = ({ validacion, mensaje }) => {
  const { alerta } = useContext(AuthContext);

  return (
    <div
      className={`my-2 border-l-4 p-4 ${
        alerta?.error || validacion
          ? "bg-red-200  border-red-500 text-red-700 "
          : "bg-green-200 border-green-500 text-green-700"
      } `}
    >
      <p className="font-bold">
        {alerta?.error || validacion ? "Error" : "Éxito"}
      </p>
      <p>{validacion ? mensaje : alerta?.msg}</p>
    </div>
  );
};

export default Alerta;
