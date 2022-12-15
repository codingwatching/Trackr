import { useMutation } from "react-query";
import AuthAPI from "../api/AuthAPI";

export const useRegister = () => {
  const mutation = useMutation(({ email, password, firstName, lastName }) =>
    AuthAPI.register(email, password, firstName, lastName)
  );

  return [mutation.mutateAsync, mutation];
};
