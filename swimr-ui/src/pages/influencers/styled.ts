import { Divider } from "@mui/material";
import styled from "styled-components";

export const CampaignWrapper = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #2021247d;
  border-radius: 10px;
  overflow: hidden;
`;

export const CampaignDivider = styled(Divider)`
  && {
    background-color: #0c5163;
  }
`;

export const CampaignPanel = styled.div`
  height: 75vh;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;
