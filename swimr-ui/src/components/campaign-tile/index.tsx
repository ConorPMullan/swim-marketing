import {
  CardContent,
  Typography,
  CardActions,
  Button,
  IconButton,
} from "@mui/material";
import React, { useState } from "react";
import { ICampaign } from "../../interfaces/campaign";
import { StyledButton } from "./styled";
import ModalComponent from "../modal";
import { Add, Edit } from "@mui/icons-material";
import EditCampaignModal from "../../pages/campaigns/components/campaign-modal";

interface ICampaignTile {
  campaign: ICampaign;
  tileType: string;
  index?: number;
  listLength?: number;
}

const CampaignTile = (props: ICampaignTile) => {
  const { campaign, index, listLength, tileType } = props;
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const handleEditModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          backgroundColor: "#ffffff85",
          color: "#0c5163",
          margin: tileType === "home" ? "0 0 0 15px" : "10px 15px",
          borderRadius: "5px",
          height: "185px",
          display: "flex",
          width: "100%",
        }}
      >
        <CardContent style={{ width: tileType === "home" ? "300px" : "100%" }}>
          <Typography variant="h6" component="div">
            {campaign.companyName}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="#c7621e">
            {campaign.campaignName}
          </Typography>
          <Typography variant="body2" color="white">
            Start Date: {startDate.toDateString()}
          </Typography>
          <Typography variant="body2" color="white">
            End Date: {endDate.toDateString()}
          </Typography>
        </CardContent>
        {tileType === "home" && (
          <CardActions sx={{ alignItems: "end" }}>
            <StyledButton size="small">See More</StyledButton>
          </CardActions>
        )}
        {tileType === "campaign" && (
          <IconButton onClick={handleEditModal}>
            <Edit />
          </IconButton>
        )}
      </div>
      {index === listLength && <div style={{ width: "15px" }} />}
      <ModalComponent open={open} handleClose={handleClose}>
        <EditCampaignModal
          handleClose={handleClose}
          modalType={modalType}
          selectedCampaign={campaign}
        />
      </ModalComponent>
    </div>
  );
};

export default CampaignTile;
