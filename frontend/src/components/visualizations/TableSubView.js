import { ProjectRouteContext } from "../../routes/ProjectRoute";
import { useEffect, useState, useContext } from "react";
import { useValues } from "../../hooks/useValues";
import { useProject } from "../../hooks/useProject";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Moment from "react-moment";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Table from "./Table";

const TableSubView = ({ visualization, metadata }) => {
  const projectId = useContext(ProjectRouteContext);
  const project = useProject(projectId);
  const limit = 8;

  const { sort } = Table.deserialize(metadata);
  const { fieldId } = visualization;

  const [offset, setOffset] = useState(0);
  const [values, totalValues] = useValues(
    project.apiKey,
    fieldId,
    sort,
    offset,
    limit
  );

  const firstPage = Math.floor(offset / limit) + 1;
  const lastPage = Math.max(1, Math.ceil(totalValues / limit));

  useEffect(() => {
    setOffset(0);

    return () => {};
  }, [fieldId, sort]);

  const handleNextPage = () => {
    setOffset(offset + values.length);
  };

  const handlePreviousPage = () => {
    setOffset(offset - limit);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          fontWeight: 400,
          py: 0.5,
          px: 2,
        }}
      >
        {values.map((value) => (
          <Box
            key={value.id}
            sx={{
              display: "flex",
              flexDirection: "row",
              py: 1.25,
              borderBottom: "1px solid #0000001f",
            }}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              {value.value}
            </Box>

            <Box sx={{ flexGrow: 1, textAlign: "right" }}>
              <Tooltip title={value.createdAt}>
                <Box>
                  <Moment format="MMM D, YYYY, HH:mm:ss">
                    {value.createdAt}
                  </Moment>
                </Box>
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          py: 1.5,
          px: 2,
          userSelect: "none",
        }}
      >
        <Box sx={{ flexGrow: 1, color: "#00000085" }}>
          Page {firstPage} of {lastPage}
        </Box>
        <IconButton disabled={offset - limit < 0} onClick={handlePreviousPage}>
          <ArrowLeftIcon />
        </IconButton>
        <IconButton
          disabled={offset + limit >= totalValues}
          onClick={handleNextPage}
        >
          <ArrowRightIcon />
        </IconButton>
      </Box>
    </>
  );
};

export default TableSubView;
