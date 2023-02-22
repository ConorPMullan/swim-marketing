import "./App.css";
import Login from "./pages/login";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const App = () => {
  const theme = createTheme();

  const loadRoutes = (
    <Routes>
      <Route path="/login" element={<Login />} />
    </Routes>
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loadRoutes}
    </ThemeProvider>
  );
};

export default App;
