import { useMutation, useQueryClient } from "react-query";
import FieldsAPI from "../api/FieldsAPI";

export const useCreateField = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(
    ({ projectId, name }) => FieldsAPI.createField(projectId, name),
    {
      onSuccess: (result, { projectId, name }) => {
        queryClient.setQueryData(
          [FieldsAPI.QUERY_KEY, projectId],
          (oldData) => {
            if (oldData) {
              oldData.data.fields = [
                ...oldData.data.fields,
                {
                  id: result.data.id,
                  name,
                  numberOfValues: 0,
                  createdAt: new Date().toISOString(),
                },
              ];
            }

            return oldData;
          }
        );
      },
    }
  );

  return [mutation.mutateAsync, mutation];
};
