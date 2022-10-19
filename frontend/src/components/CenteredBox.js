import Box from "@mui/material/Box";

const CenteredBox = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        flex: "1",
      }}
    >
      {children}
    </Box>
  );
};

export default CenteredBox;
