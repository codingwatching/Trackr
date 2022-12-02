import "swagger-ui-react/swagger-ui.css";
import "./OpenAPI.css";
import { useState } from "react";
import SwaggerUI from "swagger-ui-react";
import SwaggerYaml from "./OpenAPI.yaml";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../CenteredBox";

const OpenAPI = () => {
  const [loading, setLoading] = useState(true);

  const onComplete = () => {
    setLoading(false);
  };

  const onRequest = (req) => {
    req.url = req.url.replace(
      "http://api_path",
      process.env.REACT_APP_API_PATH
    );

    return req;
  };

  return (
    <>
      {loading && (
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      )}
      <SwaggerUI
        url={SwaggerYaml}
        onComplete={onComplete}
        requestInterceptor={onRequest}
      />
    </>
  );
};

export default OpenAPI;
