import Box from "@mui/material/Box";

const TextButton = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        flexDirection: "row",
        borderRadius: 1,
        userSelect: "none",
        py: 0.2,

        "&:hover": { background: "#ebf3ff", cursor: "pointer" },
      }}
    >
      {children}
    </Box>
  );
};

export default TextButton;
