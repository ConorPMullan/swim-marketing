import { useState } from "react";
import {
  AppointmentCard,
  CampaignCard,
  ClientBody,
  ClientDetails,
  ClientDivider,
  ClientList,
  ClientListItem,
  ClientListWrapper,
  ClientName,
  DetailsField,
  DetailsLabel,
  FlexDiv,
  SeeMoreButton,
  StyledCardContent,
  StyledList,
} from "./styled";
import {
  Avatar,
  Box,
  Button,
  Grid,
  IconButton,
  List,
  Modal,
  Typography,
} from "@mui/material";
import useGetClients from "../../hooks/useGetClients";
import useGetCampaignsByClient from "../../hooks/useGetCampaignsByClient";
import useGetClientAppointments from "../../hooks/useGetAppointmentsByClient";
import { Add, Delete, Edit } from "@mui/icons-material";
import ClientListComponent from "./components/client-list";
import Checkout from "./components/client-modal";
import EditClientModal from "./components/client-modal";
import { IClient } from "../../interfaces/client";
import ModalComponent from "../../components/modal";

const Clients = () => {
  const { data } = useGetClients();
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#121212",
    borderRadius: "15px",
    boxShadow: 24,
    padding: 0,
  };

  const [modalType, setModalType] = useState("");
  const [selectedClient, setSelectedClient] = useState<IClient>();
  const { data: campaignData } = useGetCampaignsByClient(
    String(selectedClient?.clientId) || ""
  );
  const { data: appointmentData } = useGetClientAppointments(
    String(selectedClient?.clientId) || ""
  );
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const clientData = data?.data;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const handleEditModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleCreateModal = () => {
    setSelectedClient(undefined);
    setModalType("create");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <ClientList>
      <FlexDiv
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h4" sx={{ margin: 2 }}>
          Clients
        </Typography>
        <Grid sx={{ mr: 3 }}>
          <IconButton
            sx={{ backgroundColor: "#c7621e" }}
            onClick={handleCreateModal}
          >
            <Add />
          </IconButton>
        </Grid>
      </FlexDiv>
      <ClientBody>
        <ClientListWrapper
          style={{ display: "flex", width: isDetailsOpen ? "60%" : "100%" }}
        >
          <ClientListComponent
            clientData={clientData}
            selectedClient={selectedClient}
            setIsDetailsOpen={setIsDetailsOpen}
            setSelectedClient={setSelectedClient}
          />
        </ClientListWrapper>
        {isDetailsOpen && selectedClient && (
          <ClientDetails>
            <FlexDiv
              style={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Typography variant="h4" sx={{ m: 2 }}>
                {selectedClient.clientName}
              </Typography>
              <Grid sx={{ mr: 3 }}>
                <IconButton>
                  <Delete />
                </IconButton>
                <IconButton onClick={handleEditModal}>
                  <Edit />
                </IconButton>
              </Grid>
            </FlexDiv>
            <ClientDivider />
            <Typography variant="h6" sx={{ m: 2 }}>
              <DetailsLabel>Company: </DetailsLabel>
              <DetailsField>{selectedClient.companyName}</DetailsField>
            </Typography>
            <Typography variant="h6" sx={{ m: 2 }}>
              <DetailsLabel>Email: </DetailsLabel>
              <DetailsField>{selectedClient.emailAddress}</DetailsField>
            </Typography>
            <ClientDivider />
            <Grid container>
              <Grid item xs={6} sx={{ borderRight: "1px solid #0c5163" }}>
                <Typography variant="h6" sx={{ m: 2 }}>
                  <DetailsLabel>Campaigns: </DetailsLabel>
                </Typography>
                {campaignData && campaignData.data && (
                  <List sx={{ width: "100%", display: "flex" }}>
                    {campaignData.data.map((campaign, index) => {
                      const startDate = new Date(campaign.startDate);
                      const endDate = new Date(campaign.endDate);
                      return (
                        <FlexDiv key={`campaign-key-${index}`}>
                          <CampaignCard>
                            <StyledCardContent>
                              <div>
                                <Typography variant="h6" component="div">
                                  {selectedClient.companyName}
                                </Typography>
                                <Typography sx={{ mb: 1.5 }} color="#c7621e">
                                  {campaign.campaignName}
                                </Typography>
                                <Typography variant="body2">
                                  Start Date: {startDate.toDateString()}
                                </Typography>
                                <Typography variant="body2">
                                  End Date: {endDate.toDateString()}
                                </Typography>
                              </div>
                              <SeeMoreButton size="small">
                                See More
                              </SeeMoreButton>
                            </StyledCardContent>
                          </CampaignCard>
                        </FlexDiv>
                      );
                    })}
                  </List>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ m: 2 }}>
                  <DetailsLabel>Appointments: </DetailsLabel>
                </Typography>
                {appointmentData && appointmentData.data && (
                  <List
                    sx={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {appointmentData.data.map((appointment, index) => {
                      const startDate = new Date(appointment.scheduledDateTime);
                      return (
                        <div
                          key={`appointment-key-${index}`}
                          style={{
                            display: "flex",
                            width: "100%",
                            marginBottom: "15px",
                          }}
                        >
                          <AppointmentCard>
                            <StyledCardContent>
                              <div>
                                <Typography variant="h6" component="div">
                                  {appointment.description}
                                </Typography>
                                <Typography
                                  sx={{ mb: 1.5 }}
                                  color="text.secondary"
                                >
                                  {appointment.location}
                                </Typography>
                                <Typography variant="body2">
                                  Start Time: {startDate.toLocaleTimeString()}
                                </Typography>
                              </div>
                              <SeeMoreButton size="small">
                                See More
                              </SeeMoreButton>
                            </StyledCardContent>
                          </AppointmentCard>
                        </div>
                      );
                    })}
                  </List>
                )}
              </Grid>
            </Grid>
          </ClientDetails>
        )}
      </ClientBody>
      <ModalComponent open={open} handleClose={handleClose}>
        <EditClientModal
          handleClose={handleClose}
          selectedClient={selectedClient}
          modalType={modalType}
        />
      </ModalComponent>
    </ClientList>
  );
};

export default Clients;
