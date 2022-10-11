import { useState, useEffect } from "react";
import AuthAPI from "../api/AuthAPI";

export const useAuth = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    AuthAPI.isLoggedIn()
      .then(() => setLoggedIn(true))
      .catch(() => setLoggedIn(false));

    return () => {};
  }, []);

  return loggedIn;
};
