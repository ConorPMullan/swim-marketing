import { Divider } from "@mui/material";
import styled from "styled-components";

export const InfluencerWrapper = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #2021247d;
  border-radius: 10px;
  overflow: hidden;
  &&:hover {
    overflow-y: overlay;
  }
`;

export const InfluencerDivider = styled(Divider)`
  && {
    background-color: #0c5163;
  }
`;

export const InfluencerPanel = styled.div`
  height: 70vh;
  margin: 0 10px;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  &&:hover {
    overflow-y: overlay;
  }
`;
