import { AppProvider } from "../context/AppProvider";
import { AuthProvider } from "../context/AuthProvider";

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
