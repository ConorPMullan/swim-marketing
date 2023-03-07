import {
  CardContent,
  Typography,
  CardActions,
  Grid,
  Avatar,
  List,
  ListItemAvatar,
  ListItemText,
  ListItem,
} from "@mui/material";
import React, { useState } from "react";
import { ICampaignTile } from "../../interfaces/campaign";
import { StyledButton } from "./styled";
import ModalComponent from "../modal";
import { Delete, Edit } from "@mui/icons-material";
import EditCampaignModal from "../../pages/campaigns/components/campaign-modal";
import SnapchatIcon from "../../assets/SnapchatIcon";
import TikTokIcon from "../../assets/TikTokIcon";
import InstagramIcon from "../../assets/InstagramIcon";
import FacebookIcon from "../../assets/FacebookIcon";
import YoutubeIcon from "../../assets/YoutubeIcon";
import LinkedInIcon from "../../assets/LinkedInIcon";
import PinterestIcon from "../../assets/PinterestIcon";
import TwitterIcon from "../../assets/TwitterIcon";
import useDeleteCampaign from "../../hooks/useDeleteCampaign";
import ConfirmationModal from "../confirmation-modal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { StatusCodes } from "http-status-codes";
import useGetCampaigns from "../../hooks/useGetCampaigns";

const CampaignTile = (props: ICampaignTile) => {
  const { campaign, index, listLength, tileType } = props;
  const { refetch } = useGetCampaigns();
  const startDate = new Date(campaign.startDate);
  const endDate = new Date(campaign.endDate);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const { mutate } = useDeleteCampaign();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const handleEditModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleDeleteModal = () => {
    mutate(
      { campaignId: campaign.campaignId },
      {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            toast.success("Campaign successfully deleted");
            refetch();
            handleClose();
          }
        },
        onError: () => {
          toast.error("Campaign could not be deleted");
          throw new Error();
        },
      }
    );
  };

  const handleCloseConfirmation = () => {
    setOpenConfirmation(false);
  };

  const handleConfirmation = () => {
    handleDeleteModal();
    handleCloseConfirmation();
  };

  const openConfirmationModal = () => {
    setOpenConfirmation(true);
  };

  const handleClose = () => setOpen(false);

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
  };
  const getInfluencerList = () => {
    return (
      <List sx={{ width: "100%" }}>
        {campaign.influencers?.map((allInfluencers) => {
          const { influencer } = allInfluencers;
          const bgColour = getPlatformAvatarColour(influencer.platform_id);
          return (
            <ListItem
              key={influencer.influencer_name}
              sx={{ m: 0, p: 0, ml: 1 }}
            >
              <Grid item xs={10}>
                <ListItemText
                  primaryTypographyProps={{ color: "white", fontSize: "12px" }}
                  primary={influencer.influencer_name}
                />
              </Grid>
              <Grid item xs={2} sx={{ mr: 2 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      width: "20px",
                      height: "20px",
                      bgcolor: bgColour,
                      background:
                        influencer.platform_id === 1
                          ? "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%);"
                          : "",
                    }}
                  >
                    {influencer.platform_id === 1 && <InstagramIcon />}
                    {influencer.platform_id === 2 && <SnapchatIcon />}
                    {influencer.platform_id === 3 && <TikTokIcon />}
                    {influencer.platform_id === 4 && <FacebookIcon />}
                    {influencer.platform_id === 5 && <YoutubeIcon />}
                    {influencer.platform_id === 6 && <LinkedInIcon />}
                    {influencer.platform_id === 7 && <PinterestIcon />}
                    {influencer.platform_id === 8 && <TwitterIcon />}
                  </Avatar>
                </ListItemAvatar>
              </Grid>
            </ListItem>
          );
        })}
      </List>
    );
  };

  const showInfluencers =
    campaign.influencers &&
    campaign.influencers.length > 0 &&
    tileType === "campaign";

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div
        style={{
          backgroundColor: "#ffffff85",
          color: "#0c5163",
          margin: tileType === "home" ? "0 0 0 15px" : "10px 15px",
          borderRadius: "5px",
          minHeight: "185px",
          display: "flex",
          width: "100%",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={showInfluencers ? 7 : 12}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent
              style={{ width: tileType === "home" ? "300px" : "100%" }}
            >
              <Typography variant="h6" component="div">
                {campaign.companyName}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="#c7621e">
                {campaign.campaignName}
              </Typography>
              <Typography variant="body2" color="#0088b5">
                Start Date: {startDate.toDateString()}
              </Typography>
              <Typography variant="body2" color="#0088b5">
                End Date: {endDate.toDateString()}
              </Typography>
            </CardContent>

            <CardActions sx={{ alignItems: "end" }}>
              {tileType === "home" ? (
                <StyledButton
                  size="small"
                  onClick={() => navigate("/campaigns")}
                >
                  See More
                </StyledButton>
              ) : (
                <React.Fragment>
                  <StyledButton
                    onClick={openConfirmationModal}
                    startIcon={<Delete />}
                  >
                    Delete
                  </StyledButton>
                  <StyledButton onClick={handleEditModal} startIcon={<Edit />}>
                    Edit
                  </StyledButton>
                </React.Fragment>
              )}
            </CardActions>
          </Grid>
          {showInfluencers && (
            <Grid
              item
              xs={5}
              style={{
                background: "#c7611f",
                borderTopRightRadius: "5px",
                borderBottomRightRadius: "5px",
              }}
            >
              <Typography variant="h6" component="div" sx={{ m: 1 }}>
                Influencers
              </Typography>
              {getInfluencerList()}
            </Grid>
          )}
        </Grid>
      </div>
      {index === listLength && <div style={{ width: "15px" }} />}
      <ModalComponent open={open} handleClose={handleClose}>
        <EditCampaignModal
          handleClose={handleClose}
          modalType={modalType}
          selectedCampaign={campaign}
        />
      </ModalComponent>
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirmation={handleConfirmation}
        textToDisplay="Are you sure you want to delete this campaign?"
      />
    </div>
  );
};

export default CampaignTile;
