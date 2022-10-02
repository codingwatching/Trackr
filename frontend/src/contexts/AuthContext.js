import { useState, useEffect } from "react";
import AuthAPI from "../api/AuthAPI";

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    AuthAPI.isLoggedIn()
      .then(() => {
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setIsLoggedIn(false);

        console.log(error);
      });

    return () => {};
  }, []);

  return [isLoggedIn];
};
