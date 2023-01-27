import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import OrganizationsCardBox from "../components/OrganizationsCardBox";

// Page that you can open through the navbar
// Page includes a list of organisations currently created

const Organizations = () => {
  return (
    <Container sx={{ mt: 3, pb: 4 }}>
      <OrganizationsCardBox />
    </Container>
  );
};
export default Organizations;
