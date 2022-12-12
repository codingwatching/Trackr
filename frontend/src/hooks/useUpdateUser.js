import { useMutation, useQueryClient } from "react-query";
import UsersAPI from "../api/UsersAPI";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ firstName, lastName, currentPassword, newPassword }) =>
      UsersAPI.updateUser(firstName, lastName, currentPassword, newPassword),
    {
      onSuccess: (_, { firstName, lastName }) =>
        queryClient.setQueryData(UsersAPI.QUERY_KEY, (oldData) => {
          oldData.data = {
            ...oldData.data,
            firstName,
            lastName,
          };

          return oldData;
        }),
    }
  );

  return [mutation.mutateAsync, mutation];
};
