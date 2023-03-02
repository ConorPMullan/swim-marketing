import { Divider, ListItem } from "@mui/material";
import styled from "styled-components";

export const CampaignWrapper = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #2021247d;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const CampaignDivider = styled(Divider)`
  && {
    background-color: #0c5163;
  }
`;

export const CampaignPanel = styled.div`
  height: 70vh;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const StyledListItem = styled(ListItem)`
  && {
    padding: 0;
    padding-left: 8px;
    margin: 8px 16px 8px 8px;
    width: auto;
    border-radius: 5px;
    cursor: pointer;
  }
  &:hover {
    background-color: rgba(255, 255, 255, 0.52);
    color: rgb(12, 81, 99);
  }
`;
