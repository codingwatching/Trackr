import Box from "@mui/material/Box";

const CenteredBox = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flex: "1",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
