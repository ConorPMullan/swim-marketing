import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwimrLogo250 from "../../assets/logo/swimrlogo250";
import { axiosInstance } from "../../integration/Instance";
import {
  AvailableInfluencers,
  DrawerPaper,
  MainGrid,
  UpcomingCampaigns,
  UpcomingEvents,
} from "./styled";

const Home = () => {
  const getUsers = () => {
    axiosInstance.get("/api/users");
  };

  return (
    <MainGrid>
      <UpcomingCampaigns />
      <UpcomingEvents />
      <AvailableInfluencers />
    </MainGrid>
  );
};

export default Home;
