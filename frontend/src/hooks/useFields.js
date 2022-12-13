import { useQuery } from "react-query";
import FieldsAPI from "../api/FieldsAPI";

export const useFields = (projectId) => {
  const { data } = useQuery(
    [FieldsAPI.QUERY_KEY, projectId],
    () => FieldsAPI.getFields(projectId),
    {
      suspense: true,
    }
  );

  return data.data.fields;
};
