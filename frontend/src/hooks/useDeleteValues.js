import { useMutation, useQueryClient } from "react-query";
import ValuesAPI from "../api/ValuesAPI";
import FieldsAPI from "../api/FieldsAPI";

export const useDeleteValues = (projectId) => {
  const queryClient = useQueryClient();
  const mutation = useMutation((fieldId) => ValuesAPI.deleteValues(fieldId), {
    onSuccess: (_, fieldId) => {
      queryClient.setQueryData([FieldsAPI.QUERY_KEY, projectId], (oldData) => {
        if (oldData) {
          const field = oldData.data.fields.find(
            (field) => field.id === fieldId
          );
          field.numberOfValues = 0;
        }

        return oldData;
      });
    },
  });

  return [mutation.mutateAsync, mutation];
};
