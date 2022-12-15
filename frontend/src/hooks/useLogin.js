import { useMutation, useQueryClient } from "react-query";
import AuthAPI from "../api/AuthAPI";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ email, password, rememberMe }) =>
      AuthAPI.login(email, password, rememberMe),
    {
      onSuccess: () => queryClient.clear(),
    }
  );

  return [mutation.mutateAsync, mutation];
};
