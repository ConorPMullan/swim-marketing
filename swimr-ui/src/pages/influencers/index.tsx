import React, { useState } from "react";
import {
  InfluencerDivider,
  InfluencerPanel,
  InfluencerWrapper,
} from "./styled";
import { FlexDiv } from "../clients/styled";
import { Grid, IconButton, List, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import InfluencerTile from "../../components/influencer-tile";
import useGetInfluencers from "../../hooks/useGetInfluencers";
import ModalComponent from "../../components/modal";
import EditInfluencerModal from "./components/influencer-modal";
import { IInfluencer } from "../../interfaces/influencer";

const Influencers = () => {
  const { data: influencerData, isLoading: isInfluencerLoading } =
    useGetInfluencers();

  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedInfluencer, setSelectedInfluencer] = useState<IInfluencer>();

  const handleCreateModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const getUpcomingInfluencerList = () => {
    const today = new Date();
    if (influencerData) {
      const { data: allInfluencerData } = influencerData;
      const upcomingInfluencerData = allInfluencerData.filter((influencer) => {
        const sd = new Date(influencer.startDate);
        return sd > today;
      });
      console.log("upcoming", upcomingInfluencerData);
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {upcomingInfluencerData.map((influencer, index) => {
            return (
              <InfluencerTile
                key={`influencer-tile-key-${influencer.influencerId}`}
                influencer={influencer}
                index={index}
                tileType="home"
                listLength={allInfluencerData.length - 1}
              />
            );
          })}
        </List>
      );
    }
  };

  const getOngoingInfluencerList = () => {
    const today = new Date();
    if (influencerData) {
      const { data: allInfluencerData } = influencerData;
      const ongoingInfluencerData = allInfluencerData.filter((influencer) => {
        const sd = new Date(influencer.startDate);
        const ed = new Date(influencer.endDate);
        return sd < today && ed > today;
      });
      console.log("ongoing", ongoingInfluencerData);
      return (
        <List sx={{ width: "100%", display: "flex" }}>
          {ongoingInfluencerData.map((influencer, index) => {
            return (
              <InfluencerTile
                key={`influencer-tile-key-${influencer.influencerId}`}
                influencer={influencer}
                index={index}
                tileType="home"
                listLength={allInfluencerData.length - 1}
              />
            );
          })}
        </List>
      );
    }
  };

  const getCompletedInfluencerList = () => {
    const today = new Date();
    if (influencerData) {
      const { data: allInfluencerData } = influencerData;
      const completedInfluencerData = allInfluencerData.filter((influencer) => {
        const ed = new Date(influencer.endDate);
        return ed < today;
      });
      console.log("completed", completedInfluencerData);
      return (
        <List sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          {completedInfluencerData.map((influencer, index) => {
            return (
              <InfluencerTile
                key={`influencer-tile-key-${influencer.influencerId}`}
                influencer={influencer}
                index={index}
                tileType="influencer"
              />
            );
          })}
        </List>
      );
    }
  };
  return (
    <InfluencerWrapper>
      <FlexDiv
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4" sx={{ margin: 1 }}>
          Influencers
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
          <InfluencerPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Ongoing Influencers
            </Typography>
            <InfluencerDivider />
            {getOngoingInfluencerList()}
          </InfluencerPanel>
        </Grid>
        <Grid item md={4} xs={12}>
          <InfluencerPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Upcoming Influencers
            </Typography>
            <InfluencerDivider />
            {getUpcomingInfluencerList()}
          </InfluencerPanel>
        </Grid>
        <Grid item md={4} xs={12}>
          <InfluencerPanel>
            <Typography variant="h6" sx={{ margin: 1 }}>
              Completed Influencers
            </Typography>
            <InfluencerDivider />
            {getCompletedInfluencerList()}
          </InfluencerPanel>
        </Grid>
      </Grid>
      <ModalComponent open={open} handleClose={handleClose}>
        <EditInfluencerModal
          handleClose={handleClose}
          modalType={modalType}
          selectedInfluencer={selectedInfluencer}
        />
      </ModalComponent>
    </InfluencerWrapper>
  );
};

export default Influencers;
