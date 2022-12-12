import { useUser } from "../hooks/useUser";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";

const UsageSubList = () => {
  const user = useUser();

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", flex: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flex: {
            sm: 1,
            xs: 1,
            md: 0.5,
          },
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
              pr: 1.5,
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

          <Typography variant="h7" sx={{ textAlign: "center" }}>
            {((user.numberOfValues / user.maxValues) * 100).toFixed(2)}% used
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
          flex: {
            xs: 1,
            sm: 1,
            md: 0.25,
          },
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
          flex: {
            sm: 1,
            xs: 1,
            md: 0.25,
          },
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
    </Box>
  );
};

export default UsageSubList;
