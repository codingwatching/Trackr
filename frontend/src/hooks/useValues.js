import { useQuery } from "react-query";
import ValuesAPI from "../api/ValuesAPI";

export const useValues = (apiKey, fieldId, order, offset, limit) => {
  order = order || "asc";
  offset = offset || 0;
  limit = limit || 0;

  const { data } = useQuery(
    [ValuesAPI.QUERY_KEY, apiKey, fieldId, order, offset, limit],
    () => ValuesAPI.getValues(apiKey, fieldId, order, offset, limit),
    {
      suspense: true,
      cacheTime: 0,
    }
  );

  return [data.data.values, data.data.totalValues];
};
