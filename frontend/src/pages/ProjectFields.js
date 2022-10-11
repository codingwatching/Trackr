import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const ProjectFields = () => {
  return (
    <Container sx={{ mt: 3 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          Fields
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
};

export default ProjectFields;
