import { useQuery } from "react-query";
import LogsAPI from "../api/LogsAPI";

export const useLogs = () => {
  const { data } = useQuery(LogsAPI.QUERY_KEY, LogsAPI.getLogs, {
    suspense: true,
    cacheTime: 0,
  });

  return data.data.logs;
};
