import { AppProvider } from "../context/AppProvider";
import { AuthProvider } from "../context/AuthProvider";
import "../styles/Spinner.css";

const App = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </AuthProvider>
  );
};

export default App;
