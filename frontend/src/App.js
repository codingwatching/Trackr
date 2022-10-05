import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthorizedRoute from "./components/AuthorizedRoute";
import Projects from "./pages/Projects";
import EditProject from "./pages/EditProject";

let theme = createTheme({
  palette: {
    background: {
      default: "whitesmoke",
    },
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
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/projects/"
            element={<AuthorizedRoute element={<Projects />} />}
          />
          <Route
            path="/projects/edit/:projectId"
            element={<AuthorizedRoute element={<EditProject />} />}
          />
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
