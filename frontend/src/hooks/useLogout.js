import { useMutation } from "react-query";
import AuthAPI from "../api/AuthAPI";

export const useLogout = () => {
  const mutation = useMutation(() => AuthAPI.logout());

  return [mutation.mutateAsync, mutation];
};
