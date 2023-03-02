import { useState } from "react";
import {
  AppointmentCard,
  CampaignCard,
  ClientBody,
  ClientDetails,
  ClientDivider,
  ClientList,
  ClientListWrapper,
  DetailsField,
  DetailsLabel,
  FlexDiv,
  SeeMoreButton,
  StyledCardContent,
} from "./styled";
import { Grid, IconButton, List, Typography } from "@mui/material";
import useGetClients from "../../hooks/useGetClients";
import { Add, Delete, Edit } from "@mui/icons-material";
import ClientListComponent from "./components/client-list";
import EditClientModal from "./components/client-modal";
import { IClientDetails } from "../../interfaces/client";
import ModalComponent from "../../components/modal";
import useDeleteClient from "../../hooks/useDeleteClient";
import ConfirmationModal from "../../components/confirmation-modal";

const Clients = () => {
  const { data, refetch } = useGetClients();
  const { mutate } = useDeleteClient();
  const [modalType, setModalType] = useState("");
  const [selectedClient, setSelectedClient] = useState<IClientDetails>();
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const clientData = data?.data;

  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  const handleEditModal = () => {
    setModalType("edit");
    setOpen(true);
  };

  const handleDeleteModal = () => {
    selectedClient && mutate({ clientId: selectedClient.clientId });
  };

  const handleCreateModal = () => {
    setSelectedClient(undefined);
    setModalType("create");
    setOpen(true);
  };

  const handleClose = () => {
    refetch();
    setOpen(false);
    setSelectedClient(undefined);
  };

  const handleCloseConfirmation = () => {
    refetch();
    setSelectedClient(undefined);
    setOpenConfirmation(false);
  };

  const handleConfirmation = () => {
    handleDeleteModal();
    handleCloseConfirmation();
  };

  const openConfirmationModal = () => {
    setOpenConfirmation(true);
  };

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

        {selectedClient && (
          <ClientDetails>
            <FlexDiv
              style={{
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" sx={{ m: 2 }}>
                {selectedClient.clientName}
              </Typography>
              <Grid sx={{ mr: 3 }}>
                <IconButton onClick={openConfirmationModal}>
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
            <Grid container sx={{ borderBottom: "1px solid #0c5163" }}>
              <Grid item xs={6} sx={{ borderRight: "1px solid #0c5163" }}>
                <Typography variant="h6" sx={{ m: 2 }}>
                  <DetailsLabel>Campaigns: </DetailsLabel>
                </Typography>

                <List sx={{ width: "100%", display: "flex" }}>
                  {selectedClient.campaigns.map((allCampaigns, index) => {
                    return allCampaigns.length > 0 ? (
                      allCampaigns.map((campaign) => {
                        const { campaign: campaignDetails } = campaign;
                        const startDate = new Date();
                        const endDate = new Date();

                        return (
                          <FlexDiv key={`campaign-key-${index}`}>
                            <CampaignCard>
                              <StyledCardContent>
                                <div>
                                  <Typography variant="h6" component="div">
                                    {selectedClient.companyName}
                                  </Typography>
                                  <Typography sx={{ mb: 1.5 }} color="#c7621e">
                                    {campaignDetails.campaign_name}
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
                      })
                    ) : (
                      <Typography
                        key={`no-campaigns-${selectedClient.clientId}`}
                        variant="body1"
                        sx={{ m: 2 }}
                      >
                        No campaigns for this client
                      </Typography>
                    );
                  })}
                </List>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" sx={{ m: 2 }}>
                  <DetailsLabel>Appointments: </DetailsLabel>
                </Typography>

                <List
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {selectedClient.appointments.map((allAppointments) => {
                    return allAppointments.length > 0 ? (
                      allAppointments.map((appointmentDetails, index) => {
                        const startDate = new Date(
                          appointmentDetails.appointment.scheduled_date_time
                        );
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
                                    {appointmentDetails.appointment.description}
                                  </Typography>
                                  <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                  >
                                    {appointmentDetails.appointment.location}
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
                      })
                    ) : (
                      <Typography
                        key={`no-appointments-${selectedClient.clientId}`}
                        variant="body1"
                        sx={{ m: 2 }}
                      >
                        No appointments for this client
                      </Typography>
                    );
                  })}
                </List>
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
      <ConfirmationModal
        open={openConfirmation}
        handleClose={handleCloseConfirmation}
        handleConfirmation={handleConfirmation}
        textToDisplay="Are you want to have the confirmation?"
      />
    </ClientList>
  );
};

export default Clients;
