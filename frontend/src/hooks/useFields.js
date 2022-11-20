import { useState, useEffect } from "react";
import FieldsAPI from "../api/FieldsAPI";

export const useFields = (projectId) => {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    setLoading(true);
    setFields([]);
    setError();

    FieldsAPI.getFields(projectId)
      .then((result) => {
        setLoading(false);
        setError();
        setFields(result.data.fields);
      })
      .catch((error) => {
        if (error?.response?.data?.error) {
          setError(error.response.data.error);
        } else {
          setError("Failed to load fields: " + error.message);
        }

        setLoading(false);
        setFields([]);
      });

    return () => {};
  }, [projectId]);

  return [fields, setFields, loading, error];
};
