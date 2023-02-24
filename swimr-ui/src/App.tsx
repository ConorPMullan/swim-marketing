import { useEffect } from "react";
import Login from "./pages/login";
import { Routes, Route, Navigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useAuthState } from "./stores/useAuthState";
import Home from "./pages/home";
import useTokens from "./hooks/useTokens";
import PageLayout from "./layout";
import Campaigns from "./pages/campaigns";
import Clients from "./pages/clients";
import Influencers from "./pages/influencers";
import Appointments from "./pages/appointments";

const App = () => {
  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  const { isAuthorized } = useAuthState();
  const { checkLocalStorageTokens } = useTokens();

  useEffect(() => {
    checkLocalStorageTokens();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const UnauthenticatedRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
  const AuthenticatedRoutes = (
    <PageLayout>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/influencers" element={<Influencers />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </PageLayout>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {isAuthorized ? AuthenticatedRoutes : UnauthenticatedRoutes}
    </ThemeProvider>
  );
};

export default App;
