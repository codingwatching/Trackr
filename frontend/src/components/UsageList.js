import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import TextButton from "./TextButton";

const UsageList = () => {
  const [user, , loading, error] = useUser();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        mb: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{ flexGrow: 1, pb: 2, borderBottom: "2px solid #f4f5f7", mb: 3 }}
      >
        Usage
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        {error ? (
          <CenteredBox>
            <ErrorIcon sx={{ fontSize: 50, mb: 2 }} />
            <Typography
              variant="h7"
              sx={{ mb: 10, userSelect: "none", textAlign: "center" }}
            >
              {error}
            </Typography>
          </CenteredBox>
        ) : loading ? (
          <CenteredBox>
            <CircularProgress />
          </CenteredBox>
        ) : (
          <>Test</>
        )}
      </Box>
    </Box>
  );
};

export default UsageList;
