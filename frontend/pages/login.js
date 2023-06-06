import Layout from "../components/Layout";
import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import * as Yup from "yup";
import AuthContext from "../context/AuthProvider";
import Alerta from "../components/Alerta";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const { iniciarSesion, alerta, autenticado } = useContext(AuthContext);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("El email no es válido")
        .required("El email es obligatorio"),
      password: Yup.string().required("El password es obligatorio"),
    }),
    onSubmit: (valores) => {
      iniciarSesion(valores);
    },
  });

  useEffect(() => {
    if (autenticado) router.push("/");
  }, [autenticado]);

  return (
    <Layout>
      <div className="md:w-4/5 xl:w-3/5 mx-auto mb-32">
        <h2 className="text-4xl font-sans font-bold text-gray-800 text-center my-4">
          Iniciar Sesión
        </h2>

        <div className="flex justify-center mt-5">
          <div className="w-full max-w-lg">
            {alerta && <Alerta />}
            <form
              className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
              onSubmit={formik.handleSubmit}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-black text-sm font-bold mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
                  focus:outline-none focus:shadow-outline"
                  placeholder="Email de Usuario"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <Alerta validacion={true} mensaje={formik.errors.email} />
              )}
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
                  placeholder="Password de Usuario"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <Alerta validacion={true} mensaje={formik.errors.password} />
              )}

              <input
                type="submit"
                className="bg-red-500 hover:bg-gray-900 w-full p-2 text-white uppercase font-bold cursor-pointer"
                value="Iniciar Sesión"
              />
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
