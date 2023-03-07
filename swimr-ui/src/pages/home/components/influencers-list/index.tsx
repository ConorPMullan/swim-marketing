import { Avatar, List, ListItemAvatar, ListItemText } from "@mui/material";
import {
  getPlatformAvatarColour,
  stringAvatar,
} from "../../../../utils/colors";
import { useNavigate } from "react-router-dom";
import SnapchatIcon from "../../../../assets/SnapchatIcon";
import TikTokIcon from "../../../../assets/TikTokIcon";
import InstagramIcon from "../../../../assets/InstagramIcon";
import FacebookIcon from "../../../../assets/FacebookIcon";
import YoutubeIcon from "../../../../assets/YoutubeIcon";
import LinkedInIcon from "../../../../assets/LinkedInIcon";
import PinterestIcon from "../../../../assets/PinterestIcon";
import TwitterIcon from "../../../../assets/TwitterIcon";
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
};

export default InfluencersList;
