import { Avatar, List, ListItemAvatar, ListItemText } from "@mui/material";
import {
  getPlatformAvatarColour,
  stringAvatar,
} from "../../../../utils/colors";
import { useNavigate } from "react-router-dom";
import SnapchatIcon from "../../../../assets/SnapchatIcon.svg";
import TikTokIcon from "../../../../assets/TikTokIcon.svg";
import InstagramIcon from "../../../../assets/InstagramIcon.svg";
import FacebookIcon from "../../../../assets/FacebookIcon.svg";
import YoutubeIcon from "../../../../assets/YoutubeIcon.svg";
import LinkedInIcon from "../../../../assets/LinkedInIcon.svg";
import PinterestIcon from "../../../../assets/PinterestIcon.svg";
import TwitterIcon from "../../../../assets/TwitterIcon.svg";
import { StyledListItem } from "../../styled";
import { IInfluencers } from "../../../../interfaces/influencer";

interface IInfluencersList {
  influencerData: IInfluencers[];
}
const InfluencersList = (props: IInfluencersList) => {
  const { influencerData } = props;
  const navigate = useNavigate();
  return (
    <List sx={{ width: "100%" }} data-testid="influencers-list">
      {influencerData.map((influencer) => {
        const bgColour = getPlatformAvatarColour(influencer.platform.id);
        return (
          <StyledListItem
            key={influencer.influencerId}
            onClick={() => {
              navigate("/influencers");
            }}
            data-testid={`influencers-list-item-${influencer.influencerId}`}
          >
            <Avatar {...stringAvatar(influencer.influencerName)} />
            <ListItemText
              primary={influencer.influencerName}
              secondary={influencer.pricePerPost}
              sx={{ marginLeft: "15px" }}
              data-testid={`influencers-name-${influencer.influencerName}`}
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
                {influencer.platform.id === 1 && (
                  <img src={InstagramIcon} alt="insta-icon" />
                )}
                {influencer.platform.id === 2 && (
                  <img src={SnapchatIcon} alt="snapchat-icon" />
                )}
                {influencer.platform.id === 3 && (
                  <img src={TikTokIcon} alt="tiktok-icon" />
                )}
                {influencer.platform.id === 4 && (
                  <img src={FacebookIcon} alt="facebook-icon" />
                )}
                {influencer.platform.id === 5 && (
                  <img src={YoutubeIcon} alt="youtube-icon" />
                )}
                {influencer.platform.id === 6 && (
                  <img src={LinkedInIcon} alt="linkedin-icon" />
                )}
                {influencer.platform.id === 7 && (
                  <img src={PinterestIcon} alt="pinterest-icon" />
                )}
                {influencer.platform.id === 8 && (
                  <img src={TwitterIcon} alt="twitter-icon" />
                )}
              </Avatar>
            </ListItemAvatar>
          </StyledListItem>
        );
      })}
    </List>
  );
};

export default InfluencersList;
