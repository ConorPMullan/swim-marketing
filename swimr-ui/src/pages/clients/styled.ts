import styled from "styled-components";
import Paper from "@mui/material/Paper";
import { Button, CardContent, Divider, List, ListItem } from "@mui/material";

interface IClientDetails {
  $isSelected: boolean;
}

export const DrawerPaper = styled(Paper)`
  && {
    background-color: transparent;
  }
`;

export const ClientList = styled.div`
  width: 100%;
  height: 85vh;
  background-color: #2021247d;
  border-radius: 10px;
  overflow: hidden;
`;

export const FlexDiv = styled.div`
  display: flex;
  width: 100%;
`;

export const AppointmentCard = styled.div`
  background-color: #c7621e;
  color: #0c5163;
  margin: 0px 0 0 15px;
  border-radius: 5px;
  height: 185px;
  display: flex;
  width: 90%;
`;

export const SeeMoreButton = styled(Button)`
  && {
    color: white;
    background-color: #0c5163;
    width: 100px;
  }
  &&:hover {
    color: #0c5163;
  }
`;

export const StyledList = styled(List)`
  overflow-y: scroll;
  width: 100%;
`;
export const ClientBody = styled.div`
  display: flex;
`;
export const ClientDetails = styled.div`
  width: 50%;
  height: 75vh;
  background-color: rgba(255, 255, 255, 0.52);
  border-radius: 10px;
  overflow: hidden;
  margin: 0px 15px;
  overflow-y: scroll;
`;

export const ClientListWrapper = styled.div`
  width: 100%;
  height: 75vh;
  border-radius: 10px;
  overflow: hidden;
  overflow-y: scroll;
`;

export const ClientName = styled.div`
  margin-left: 10px;
`;

export const DetailsLabel = styled.b`
  color: #0c5163;
`;

export const DetailsField = styled.span`
  font-size: 18px;
`;

export const ClientDivider = styled(Divider)`
  && {
    background-color: #0c5163;
  }
`;

export const CampaignCard = styled.div`
  background-color: #ffffff85;
  color: #0c5163;
  margin: 0px 0 0 15px;
  border-radius: 5px;
  height: 185px;
  display: flex;
  width: 90%;
`;

export const StyledCardContent = styled(CardContent)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ClientListItem = styled(ListItem)<IClientDetails>`
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
  background-color: ${({ $isSelected }) =>
    $isSelected ? "rgba(255, 255, 255, 0.52)" : "transparent"};
`;
