import {
  AvailableInfluencers,
  AvailableInfluencersTitle,
  CampaignList,
  MainGrid,
  UpcomingAppointmentsContainer,
  UpcomingCampaigns,
} from "./styled";
import useGetInfluencers from "../../hooks/useGetInfluencers";
import { List } from "@mui/material";
import useGetCampaigns from "../../hooks/useGetCampaigns";
import useGetAppointments from "../../hooks/useGetAppointments";
import CampaignTile from "../../components/campaign-tile";
import AppointmentsList from "./components/appointments-list";
import InfluencersList from "./components/influencers-list";

const Home = () => {
  const { data, isLoading } = useGetInfluencers();
  const { data: campaignData, isLoading: isCampaignLoading } =
    useGetCampaigns();
  const { data: appointmentData, isLoading: isAppointmentsLoading } =
    useGetAppointments();
  const getInfluencerList = () => {
    if (data) {
      const { data: influencerData } = data;
      return <InfluencersList influencerData={influencerData} />;
    }
  };

  const UpcomingAppointments = () => {
    if (appointmentData) {
      const currentDate = new Date();
      const sortedAppointments = [...appointmentData.data]
        .filter(
          (appointment) =>
            new Date(appointment.appointment.scheduled_date_time) > currentDate
        )
        .sort((a, b) => {
          return (
            //@ts-ignore
            Date.parse(a.appointment.scheduled_date_time) -
            //@ts-ignore
            Date.parse(b.appointment.scheduled_date_time)
          );
        });
      return <AppointmentsList sortedAppointments={sortedAppointments} />;
    } else {
      return <div>No Appointments to display</div>;
    }
  };

  const getCampaignList = () => {
    if (campaignData) {
      const { data: allCampaignData } = campaignData;
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {allCampaignData &&
            allCampaignData.map((campaign, index) => {
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
          <UpcomingAppointmentsContainer>
            <AvailableInfluencersTitle>
              Upcoming Events
            </AvailableInfluencersTitle>
            {UpcomingAppointments && <UpcomingAppointments />}
          </UpcomingAppointmentsContainer>
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
