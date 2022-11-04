import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ProjectRoute from "./routes/ProjectRoute";
import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import AuthorizedRoute from "./routes/AuthorizedRoute";
import Projects from "./pages/Projects";
import ProjectSettings from "./pages/ProjectSettings";
import ProjectFields from "./pages/ProjectFields";
import UserSettings from "./pages/UserSettings";
import UserRoute from "./routes/UserRoute";
import Project from "./pages/Project";
import ProjectAPI from "./pages/ProjectAPI";

let theme = createTheme({
  palette: {
    primary: {
      main: "#4184e9",
    },
    secondary: {
      main: "#edf2ff",
    },
  },
  disableTransition: {
    transition: "none",
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
            path="/settings/"
            element={
              <AuthorizedRoute
                element={<UserRoute element={<UserSettings />} />}
              />
            }
          />
          <Route
            path="/projects/settings/:projectId"
            element={
              <AuthorizedRoute
                element={<ProjectRoute element={<ProjectSettings />} />}
              />
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <AuthorizedRoute
                element={<ProjectRoute element={<Project />} />}
              />
            }
          />
          <Route
            path="/projects/api/:projectId"
            element={
              <AuthorizedRoute
                element={<ProjectRoute element={<ProjectAPI />} />}
              />
            }
          />
          <Route
            path="/projects/fields/:projectId"
            element={
              <AuthorizedRoute
                element={<ProjectRoute element={<ProjectFields />} />}
              />
            }
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
