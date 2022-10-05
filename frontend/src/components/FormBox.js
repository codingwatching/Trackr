import Box from "@mui/material/Box";

const FormBox = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        my: 13,
        pb: 5.5,
        pt: 4,
        px: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default FormBox;
