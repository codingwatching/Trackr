import { useUser } from "../hooks/useUser";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import CenteredBox from "../components/CenteredBox";
import ErrorIcon from "@mui/icons-material/Error";

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
        sx={{ flexGrow: 1, pb: 2, borderBottom: "2px solid #ededed", mb: 3 }}
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
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0.5,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                px: 5,
                py: 8,
                background: "white",
                boxShadow: "0 1px 1px 1px rgb(9 30 66 / 10%)",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "start",
                  mb: 1,
                  color: "#585858",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flex: 1,
                    pr: 1,
                  }}
                >
                  <Typography variant="h7">
                    {user.numberOfValues.toLocaleString()}
                  </Typography>
                  <Typography variant="h7" sx={{ mx: 0.5 }}>
                    /
                  </Typography>
                  <Typography variant="h7">
                    {user.maxValues.toLocaleString()}
                  </Typography>
                </Box>

                <Typography variant="h7">
                  {((user.numberOfValues / user.maxValues) * 100).toFixed(2)}%
                  used
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={(user.numberOfValues / user.maxValues) * 100}
                sx={{ width: "100%", mb: 1 }}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0.25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                px: 2,
                py: 8,
                background: "white",
                boxShadow: "0 1px 1px 1px rgb(9 30 66 / 10%)",
              }}
            >
              <Typography variant="h5">
                {user.numberOfValues.toLocaleString()}
              </Typography>
              <Typography variant="h5" sx={{ color: "gray" }}>
                values
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0.25,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 1,
                px: 2,
                py: 8,
                background: "white",
                boxShadow: "0 1px 1px 1px rgb(9 30 66 / 10%)",
              }}
            >
              <Typography variant="h5">
                {user.numberOfFields.toLocaleString()}
              </Typography>
              <Typography variant="h5" sx={{ color: "gray" }}>
                fields
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UsageList;
