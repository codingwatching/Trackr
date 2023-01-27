import { useNavigate } from "react-router-dom";
// import { useProjects } from "../hooks/useProjects"; ----> will need to make hood useOrganizations to connect with DB
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CenteredBox from "./CenteredBox";
import GroupsIcon from "@mui/icons-material/Groups";
import Card from "@mui/material/Card";
import OrganizationsMenuButton from "./OrganizationsMenuButton";
import TextButton from "./TextButton";

const OrganizationsCardList = () => {
  //stub database for organizations
  // NEED REPLACEMENT WITH ACTUAL DATABASE
  const organization_1 = {
    name: "Organization 1",
    numMembers: 32,
    numProjects: 3,
    id: 1,
  };
  const organization_2 = {
    name: "Organization 2",
    numMembers: 12,
    numProjects: 1,
    id: 2,
  };
  const organization_3 = {
    name: "Organization 3",
    numMembers: 65,
    numProjects: 6,
    id: 3,
  };

  const organizations = [organization_1, organization_2, organization_3];

  // UNCOMMENT WHEN DATABASE IS IMPLEMENTED
  //const organizations = useOrganizations();
  const navigate = useNavigate();

  return organizations.length === 0 ? (
    <CenteredBox>
      <Typography variant="h7" sx={{ color: "gray" }}>
        You currently have no organizations.
      </Typography>
    </CenteredBox>
  ) : (
    organizations.map((organization) => (
      <Card
        key={organization.id}
        sx={{
          display: "flex",
          flexDirection: "row",
          minWidth: {
            xs: "100%",
            sm: "49%",
            md: "23%",
          },
          maxWidth: {
            xs: "unset",
            sm: "unset",
            md: "200px",
          },
          flex: 1,
          borderRadius: 1,
          background: "#ebf3ff",
          boxShadow: "0 1px 1px 1px rgb(9 30 66 / 10%)",
        }}
      >
        {/*<CardActionArea>*/}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              background: "white",
              mt: 5,
              px: 2,
              pb: 3,
              flex: 1,
            }}
          >
            <GroupsIcon
              sx={{
                fontSize: 35,
                color: "#3887ff",
                //   backgroundColor: "#bed8ff",
                borderRadius: 1,
                mt: "-35px",
                mb: 1,
              }}
            />
            {/* Name of the organization */}
            <TextButton onClick={() => navigate("/organizations/" + organization.id)}>
              <Typography variant="h6" sx={{ fontSize: "18px" }}>
                {organization.name}
              </Typography>
            </TextButton>

            <Typography variant="h6" sx={{ fontSize: "13px", flex: 1, mt: 3}}>
              Users: {organization.numMembers}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row" }} >
              <Typography variant="h6" sx={{ fontSize: "13px", flex: 1 }}>
                Projects: {organization.numProjects}
              </Typography>
              <OrganizationsMenuButton sx={{ zIndex: "" }} organization={organization} />
            </Box>
          </Box>
        {/*</CardActionArea>*/}
      </Card>
    ))
  );
};

export default OrganizationsCardList;
