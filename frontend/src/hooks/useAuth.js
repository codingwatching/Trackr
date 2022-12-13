import { useState, useEffect } from "react";
import AuthAPI from "../api/AuthAPI";

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    AuthAPI.isLoggedIn()
      .then(() => {
        setIsLoading(false);
        setLoggedIn(true);
      })
      .catch(() => {
        setIsLoading(false);
        setLoggedIn(false);
      });

    return () => {};
  }, []);

  return [loggedIn, isLoading];
};
