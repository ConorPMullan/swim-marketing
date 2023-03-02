import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwimrLogo250 from "../../assets/logo/swimrlogo250";
import { axiosInstance } from "../../integration/Instance";
import {
  AvailableInfluencers,
  AvailableInfluencersTitle,
  CampaignList,
  DrawerPaper,
  MainGrid,
  StyledListItem,
  UpcomingCampaigns,
  UpcomingEvents,
} from "./styled";
import useGetInfluencers from "../../hooks/useGetInfluencers";
import TimerIcon from "@mui/icons-material/Timer";
import ImageIcon from "@mui/icons-material/Image";
import {
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  CardActions,
  CardContent,
  Card,
} from "@mui/material";
import SnapchatIcon from "../../assets/SnapchatIcon";
import TikTokIcon from "../../assets/TikTokIcon";
import { Instagram } from "@mui/icons-material";
import InstagramIcon from "../../assets/InstagramIcon";
import FacebookIcon from "../../assets/FacebookIcon";
import YoutubeIcon from "../../assets/YoutubeIcon";
import LinkedInIcon from "../../assets/LinkedInIcon";
import PinterestIcon from "../../assets/PinterestIcon";
import TwitterIcon from "../../assets/TwitterIcon";
import React from "react";
import useGetCampaigns from "../../hooks/useGetCampaigns";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useGetAppointments from "../../hooks/useGetAppointments";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CampaignTile from "../../components/campaign-tile";
const Home = () => {
  const { data, isLoading } = useGetInfluencers();
  const { data: campaignData, isLoading: isCampaignLoading } =
    useGetCampaigns();
  const { data: appointmentData, isLoading: isAppointmentsLoading } =
    useGetAppointments();

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        color: "white",
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const getPlatformAvatarColour = (platformId: number) => {
    switch (platformId) {
      case 1:
        return "white";
      case 2:
        return "yellow";
      case 3:
        return "#292929";
      case 4:
        return "white";
      case 5:
        return "white";
      case 6:
        return "white";
      case 7:
        return "white";
      case 8:
        return "#1c93e3";
      default:
        return "white";
    }
    // platformId === 1 && return "";
    // platformId === 2 && <SnapchatIcon />
    // platformId === 3 && <TikTokIcon />
    // platformId === 4 && <FacebookIcon />
    // platformid === 5 && <YoutubeIcon />
    // platformId === 6 && <LinkedInIcon />
    // platformId === 7 && <PinterestIcon />
    // platformId === 8 && <TwitterIcon />}
  };
  const getInfluencerList = () => {
    if (data) {
      const { data: influencerData } = data;
      return (
        <List sx={{ width: "100%" }}>
          {influencerData.map((influencer) => {
            const bgColour = getPlatformAvatarColour(influencer.platform.id);
            return (
              <StyledListItem
                key={influencer.influencerId}
                onClick={() => {
                  console.log("do something");
                }}
              >
                <Avatar {...stringAvatar(influencer.influencerName)} />
                <ListItemText
                  primary={influencer.influencerName}
                  secondary={influencer.pricePerPost}
                  sx={{ marginLeft: "15px" }}
                />
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: bgColour,
                      background:
                        influencer.platform.id === 1
                          ? "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
                          : "",
                    }}
                  >
                    {influencer.platform.id === 1 && <InstagramIcon />}
                    {influencer.platform.id === 2 && <SnapchatIcon />}
                    {influencer.platform.id === 3 && <TikTokIcon />}
                    {influencer.platform.id === 4 && <FacebookIcon />}
                    {influencer.platform.id === 5 && <YoutubeIcon />}
                    {influencer.platform.id === 6 && <LinkedInIcon />}
                    {influencer.platform.id === 7 && <PinterestIcon />}
                    {influencer.platform.id === 8 && <TwitterIcon />}
                  </Avatar>
                </ListItemAvatar>
              </StyledListItem>
            );
          })}
        </List>
      );
    }
  };

  const UpcomingAppointments = () => {
    if (appointmentData) {
      return (
        <div>
          {appointmentData.data.map((appointment, index) => {
            const ad = new Date(appointment.appointment.scheduled_date_time);
            return (
              <div
                key={`appointment-key-${index}`}
                style={{
                  width: "95%",
                  margin: "15px",
                  borderRadius: "10px",
                  backgroundColor: "#98b2bd",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CardContent
                    sx={{
                      width: "40%",
                      backgroundColor: "#c7621e",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                    }}
                  >
                    <Typography variant="h5" component="div" color="white">
                      {appointment.appointment.description}
                    </Typography>
                    <Typography
                      sx={{ mt: 1, mb: 1.5, display: "flex" }}
                      color="text.secondary"
                    >
                      <TimerIcon sx={{ mr: 1.5 }} width="10px" />
                      {appointment.appointment.duration}
                      minutes
                    </Typography>
                    <Typography
                      sx={{ mt: 1, mb: 1.5, display: "flex" }}
                      color="text.secondary"
                    >
                      <LocationOnIcon sx={{ mr: 1.5 }} width="10px" />
                      {appointment.appointment.location}
                    </Typography>
                  </CardContent>
                  <CardContent
                    style={{
                      textAlign: "center",
                      width: "40%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {appointment.client.email}
                      </Typography>
                      <Typography variant="body1">
                        {appointment.users.email}
                      </Typography>
                    </div>
                    <PeopleAltIcon />
                  </CardContent>
                  <CardContent
                    style={{
                      textAlign: "center",
                      width: "20%",
                      padding: 0,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="body1">
                        {ad.toLocaleString("en-us", { weekday: "short" })}
                      </Typography>
                      <Typography variant="h4" color="#c7621e">
                        {ad.getDate()}
                      </Typography>
                      <Typography variant="h6">
                        {ad.toLocaleString("en-us", { month: "short" })}
                      </Typography>
                    </div>
                    <CalendarTodayIcon />
                  </CardContent>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>No Appointments to display</div>;
    }
  };

  const getCampaignList = () => {
    if (campaignData) {
      const { data: allCampaignData } = campaignData;
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {allCampaignData.map((campaign, index) => {
            return (
              <CampaignTile
                key={`campaign-tile-key-${campaign.campaignId}`}
                campaign={campaign}
                index={index}
                tileType="home"
                listLength={allCampaignData.length - 1}
              />
            );
          })}
        </List>
      );
    }
  };
  return (
    <>
      {isLoading || isCampaignLoading || isAppointmentsLoading ? (
        <div>Is Loading </div>
      ) : (
        <MainGrid>
          <UpcomingEvents>
            <AvailableInfluencersTitle>
              Upcoming Events
            </AvailableInfluencersTitle>
            {UpcomingAppointments && <UpcomingAppointments />}
          </UpcomingEvents>
          <AvailableInfluencers>
            <AvailableInfluencersTitle>
              Available Influencers
            </AvailableInfluencersTitle>
            {getInfluencerList()}
          </AvailableInfluencers>
          <UpcomingCampaigns>
            <AvailableInfluencersTitle>
              Upcoming Campaigns
            </AvailableInfluencersTitle>
            <CampaignList>{getCampaignList()}</CampaignList>
          </UpcomingCampaigns>
        </MainGrid>
      )}
    </>
  );
};

export default Home;
