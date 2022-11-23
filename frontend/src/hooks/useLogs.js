import { useState, useEffect } from "react";
import LogsAPI from "../api/LogsAPI";

export const useLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setLogs([]);
    setError();

    LogsAPI.getLogs()
      .then((result) => {
        setLoading(false);
        setError();
        setLogs(result.data.logs);
      })
      .catch((error) => {
        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to load logs: " + error.message);
        }

        setLoading(false);
        setLogs([]);
      });

    return () => {};
  }, []);

  return [logs, loading, error];
};
