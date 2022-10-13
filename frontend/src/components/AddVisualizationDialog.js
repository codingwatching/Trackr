import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import TimelineIcon from "@mui/icons-material/Timeline";
import Typography from "@mui/material/Typography";
import TableRowsIcon from "@mui/icons-material/TableRows";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

const AddVisualizationDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Visualization</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 2 }}>
          Select a visualization type from the list below.
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <ButtonBase
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 110,
              width: 110,
              borderRadius: 1,
              background:
                "linear-gradient(0deg, rgba(2,0,100,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);",
              color: "white",
              boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
            }}
          >
            <TableRowsIcon sx={{ mb: 1 }} />
            Table
          </ButtonBase>

          <ButtonBase
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 110,
              width: 110,
              borderRadius: 1,
              background:
                "linear-gradient(180deg, rgba(0,199,3,1) 0%, rgba(9,150,0   ,1) 35%, rgba(0,50,0,1) 100%);",
              color: "white",
              boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
            }}
          >
            <TimelineIcon sx={{ mb: 1 }} />
            Line Graph
          </ButtonBase>

          <ButtonBase
            sx={{
              display: "flex",
              flexDirection: "column",
              height: 110,
              width: 110,
              borderRadius: 1,
              background:
                "linear-gradient(180deg, rgba(199,0,3,1) 0%, rgba(150,0,0   ,1) 35%, rgba(50,0,0,1) 100%);",
              color: "white",
              boxShadow: "0px 2px 3px -1px rgb(157 157 157 / 56%)",
            }}
          >
            <LeaderboardIcon sx={{ mb: 1 }} />
            Bar Graph
          </ButtonBase>
        </Box>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default AddVisualizationDialog;
