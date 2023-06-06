import { useContext, useEffect } from "react";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthProvider";
export default function Home() {
  const { autenticado, usuarioAutenticado } = useContext(AuthContext);
  console.log("Index");
  useEffect(() => {
    return () => usuarioAutenticado();
  }, []);
  return (
    <Layout>
      <h1>Index</h1>
    </Layout>
  );
}
