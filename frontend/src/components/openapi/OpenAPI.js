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

  return (
    <>
      {loading && (
        <CenteredBox>
          <CircularProgress />
        </CenteredBox>
      )}
      <SwaggerUI url={SwaggerYaml} onComplete={onComplete} />
    </>
  );
};

export default OpenAPI;
