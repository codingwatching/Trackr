import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import defaultImg from "../media/default_org_img.png";
import Link from "@mui/material/Link";

export default function OrganizationCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={defaultImg}
      />
      <CardContent>
        {/* look into projextsTable for more info on om iplementation */}
        <Link
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          Organization 1
        </Link>
      </CardContent>
      <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
