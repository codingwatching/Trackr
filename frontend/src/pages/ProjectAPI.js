import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const ProjectAPI = () => {
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
          API
        </Typography>
      </Box>
      <Divider />
    </Container>
  );
};

export default ProjectAPI;
