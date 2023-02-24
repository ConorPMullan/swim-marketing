import styled from "styled-components";
import Paper from "@mui/material/Paper";

export const DrawerPaper = styled(Paper)`
  && {
    background-color: transparent;
  }
`;

export const MainGrid = styled.div`
  display: grid;
  max-height: 95vh;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 2fr 2fr;
  gap: 15px 15px;
  grid-auto-flow: row;

  /* .upcoming-campaigns {
    grid-area: 2 / 1 / 3 / 3;
  }

  .upcoming-events {
    grid-area: 1 / 1 / 2 / 2;
  }

  .available-influencers {
    grid-area: 1 / 2 / 2 / 3;
  } */
`;

export const UpcomingCampaigns = styled.div`
  grid-area: 2 / 1 / 3 / 3;
  width: 100%;
  height: 40vh;
  background-color: #2021247d;
  border-radius: 10px;
`;
export const UpcomingEvents = styled.div`
  grid-area: 1 / 1 / 2 / 2;
   width: 100%
  height: 40vh;
  background-color: #2021247d;
  border-radius: 10px;
`;
export const AvailableInfluencers = styled.div`
  grid-area: 1 / 2 / 2 / 3;
   width: 100%
  height: 40vh;
  background-color: #2021247d;
  border-radius: 10px;
`;
