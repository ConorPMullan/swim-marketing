import React, { useState } from "react";
import { CampaignDivider, CampaignPanel, CampaignWrapper } from "./styled";
import { FlexDiv } from "../clients/styled";
import { Grid, IconButton, List, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import CampaignTile from "../../components/campaign-tile";
import useGetCampaigns from "../../hooks/useGetCampaigns";
import ModalComponent from "../../components/modal";
import EditCampaignModal from "./components/campaign-modal";
import { ICampaign } from "../../interfaces/campaign";

const Campaigns = () => {
  const { data: campaignData, isLoading: isCampaignLoading } =
    useGetCampaigns();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<ICampaign>();

  const handleCreateModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getUpcomingCampaignList = () => {
    const today = new Date();
    if (campaignData) {
      const { data: allCampaignData } = campaignData;
      const upcomingCampaignData = allCampaignData.filter((campaign) => {
        const sd = new Date(campaign.startDate);
        return sd > today;
      });
      console.log("upcoming", upcomingCampaignData);
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {upcomingCampaignData.map((campaign, index) => {
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

  const getOngoingCampaignList = () => {
    const today = new Date();
    if (campaignData) {
      const { data: allCampaignData } = campaignData;
      const ongoingCampaignData = allCampaignData.filter((campaign) => {
        const sd = new Date(campaign.startDate);
        const ed = new Date(campaign.endDate);
        return sd < today && ed > today;
      });
      console.log("ongoing", ongoingCampaignData);
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {ongoingCampaignData.map((campaign, index) => {
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

  const getCompletedCampaignList = () => {
    const today = new Date();
    if (campaignData) {
      const { data: allCampaignData } = campaignData;
      const completedCampaignData = allCampaignData.filter((campaign) => {
        const ed = new Date(campaign.endDate);
        return ed < today;
      });
      console.log("completed", completedCampaignData);
      return (
        <List sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {completedCampaignData.map((campaign, index) => {
            return (
              <CampaignTile
                key={`campaign-tile-key-${campaign.campaignId}`}
                campaign={campaign}
                index={index}
                tileType="campaign"
              />
            );
          })}
        </List>
      );
    }
  };
  return (
    <CampaignWrapper>
      <FlexDiv
        style={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h4" sx={{ margin: 2, mb: 0 }}>
          Campaigns
        </Typography>
        <Grid sx={{ mr: 3 }}>
          <IconButton
            sx={{ backgroundColor: "#c7621e" }}
            onClick={handleCreateModal}
          >
            <Add />
          </IconButton>
        </Grid>
      </FlexDiv>
      <Grid container>
        <Grid item md={4} xs={12}>
          <CampaignPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Ongoing Campaigns
            </Typography>
            <CampaignDivider />
            {getOngoingCampaignList()}
          </CampaignPanel>
        </Grid>
        <Grid item md={4} xs={12}>
          <CampaignPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Upcoming Campaigns
            </Typography>
            <CampaignDivider />
            {getUpcomingCampaignList()}
          </CampaignPanel>
        </Grid>
        <Grid item md={4} xs={12}>
          <CampaignPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Completed Campaigns
            </Typography>
            <CampaignDivider />
            {getCompletedCampaignList()}
          </CampaignPanel>
        </Grid>
      </Grid>
      <ModalComponent open={open} handleClose={handleClose}>
        <EditCampaignModal
          handleClose={handleClose}
          modalType={modalType}
          selectedCampaign={selectedCampaign}
        />
      </ModalComponent>
    </CampaignWrapper>
  );
};

export default Campaigns;
