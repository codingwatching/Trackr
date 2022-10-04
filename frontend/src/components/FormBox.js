import Paper from "@mui/material/Paper";

const FormBox = ({ children, ...props }) => {
  return (
    <Paper
      {...props}
      sx={{
        my: 13,
        pb: 5.5,
        pt: 4,
        px: 6,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0px 2px 5px -1px #dbd6d6",
      }}
    >
      {children}
    </Paper>
  );
};

export default FormBox;
