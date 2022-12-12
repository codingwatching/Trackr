import { useEffect } from "react";
import { useQuery } from "react-query";
import LogsAPI from "../api/LogsAPI";

export const useLogs = () => {
  const { data, remove } = useQuery(LogsAPI.QUERY_KEY, LogsAPI.getLogs, {
    suspense: true,
  });

  useEffect(remove, [remove]);

  return data.data.logs;
};
