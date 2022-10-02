import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthorizedRoute from "./components/AuthorizedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

let theme = createTheme({
  palette: {
    primary: {
      main: "#0052cc",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
});

const App = () => {
  return (
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<AuthorizedRoute element={<Dashboard />} />}
          />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
