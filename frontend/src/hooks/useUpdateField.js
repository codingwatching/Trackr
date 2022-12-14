import { useMutation, useQueryClient } from "react-query";
import FieldsAPI from "../api/FieldsAPI";

export const useUpdateField = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ id, name }) => FieldsAPI.updateField(id, name),
    {
      onSuccess: (_, { id, name }) =>
        queryClient.setQueryData(
          [FieldsAPI.QUERY_KEY, projectId],
          (oldData) => {
            if (oldData) {
              const field = oldData.data.fields.find(
                (field) => field.id === id
              );
              field.name = name;
            }

            return oldData;
          }
        ),
    }
  );

  return [mutation.mutateAsync, mutation];
};
