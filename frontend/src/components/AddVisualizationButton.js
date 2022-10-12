import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ButtonBase from "@mui/material/ButtonBase";
import Typography from "@mui/material/Typography";

const AddVisualizationButton = () => {
  return (
    <>
      <ButtonBase
        sx={{
          "&:hover": {
            background: "hsl(216deg 50% 91%)",
          },
          display: "flex",
          flexDirection: "column",
          p: 9,
          alignItems: "center",
          justifyContent: "center",
          transition: "background 0.2s",
          borderRadius: 2,
          backgroundColor: "#f0f4fa",
          boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
        }}
      >
        <AddRoundedIcon sx={{ fontSize: 30, mb: 1 }} />
        <Typography variant="button">Add Visualization</Typography>
      </ButtonBase>
    </>
  );
};

export default AddVisualizationButton;
