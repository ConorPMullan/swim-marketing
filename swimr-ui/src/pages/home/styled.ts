import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { ListItem } from "@mui/material";

export const DrawerPaper = styled(Paper)`
  && {
    background-color: transparent;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  max-height: 87vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 2fr;
  gap: 15px 15px;
  grid-auto-flow: row;
`;

export const UpcomingCampaigns = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  width: 100%;
  height: 35vh;
  background-color: #272727b8;
  border-radius: 10px;
  overflow: hidden;

  &&:hover {
    overflow-x: scroll;
  }
`;
export const UpcomingAppointmentsContainer = styled.div`
  grid-area: 1 / 1 / 2 / 2;
  width: 100%;
  height: 48vh;
  background-color: #272727b8;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;
export const CampaignList = styled.div`
  display: flex;
`;
export const AvailableInfluencers = styled.div`
  grid-area: 1 / 2 / 2 / 3;
  width: 100%;
  height: 48vh;
  background-color: #272727b8;
  border-radius: 10px;
  overflow: hidden;

  &&:hover {
    overflow-y: scroll;
  }
`;

export const AvailableInfluencersTitle = styled.div`
  font-family: "Poppins", sans-serif;
  margin: 15px 0 5px 15px;
  font-weight: 600;
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
