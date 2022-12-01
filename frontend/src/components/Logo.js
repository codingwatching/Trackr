import * as React from "react";
import Typography from "@mui/material/Typography";
import InsertChartIcon from "@mui/icons-material/InsertChart";

const Logo = () => {
  return (
    <>
      <InsertChartIcon sx={{ color: "primary.main", mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        sx={{
          ml: -0.5,
          fontWeight: 500,
          color: "black",
          userSelect: "none",
          textDecoration: "none",
        }}
      >
        trackr
      </Typography>
    </>
  );
};

export default Logo;
