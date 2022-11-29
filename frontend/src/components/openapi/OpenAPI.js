import "swagger-ui-react/swagger-ui.css";
import "./OpenAPI.css";
import SwaggerUI from "swagger-ui-react";
import SwaggerYaml from "./OpenAPI.yaml";

const OpenAPI = () => <SwaggerUI url={SwaggerYaml} />;

export default OpenAPI;
