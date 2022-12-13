import { ProjectRouteContext } from "../../routes/ProjectRoute";
import { useFields } from "../../hooks/useFields";
import { useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ErrorIcon from "@mui/icons-material/Error";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../CenteredBox";
import VisualizationMenuButton from "../VisualizationMenuButton";
import LoadingBoundary from "../LoadingBoundary";
import GraphSubView from "./GraphSubView";
import Graph from "./Graph";
import ErrorBoundary from "../ErrorBoundary";

const GraphView = ({ visualizationType, visualization, metadata }) => {
  const { fieldId } = visualization;
  const { graphFunction, graphTimestep } = Graph.deserialize(metadata);

  const projectId = useContext(ProjectRouteContext);
  const fields = useFields(projectId);
  const fieldName = fields.find((field) => field.id === fieldId)?.name;

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          py: 1.5,
          px: 2,
          borderBottom: "1px solid #0000001f",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexGrow: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Box>{fieldName}</Box>
          {graphFunction !== "none" && (
            <Box sx={{ ml: 0.5, color: "gray" }}>
              ({graphTimestep} {graphFunction})
            </Box>
          )}
        </Box>
        <Box>
          <VisualizationMenuButton
            visualizationType={visualizationType}
            visualization={visualization}
            metadata={metadata}
          />
        </Box>
      </Box>

      <ErrorBoundary
        fallback={({ error }) => (
          <CenteredBox>
            <ErrorIcon sx={{ fontSize: 50, mb: 1.5 }} />
            <Typography variant="h7" sx={{ userSelect: "none", mb: 2 }}>
              {error}
            </Typography>
          </CenteredBox>
        )}
      >
        <LoadingBoundary
          fallback={
            <CenteredBox>
              <CircularProgress />
            </CenteredBox>
          }
        >
          <GraphSubView visualization={visualization} metadata={metadata} />
        </LoadingBoundary>
      </ErrorBoundary>
    </>
  );
};

export default GraphView;
