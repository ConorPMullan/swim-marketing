import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { IClientDetails } from "../../../../interfaces/client";
import ClientForm from "../client-form";
import useUpdateClientDetails from "../../../../hooks/useUpdateClientDetails";
import { useState } from "react";
import { StatusCodes } from "http-status-codes";

interface IClientModalProps {
  handleClose: () => void;
  selectedClient: IClientDetails | undefined;
  modalType: string;
}

export default function EditClientModal(props: IClientModalProps) {
  const { handleClose, selectedClient, modalType } = props;
  const { mutate } = useUpdateClientDetails();

  const initialClientDetails = selectedClient;
  const emptyClientDetails = {
    clientId: 0,
    clientName: "",
    emailAddress: "",
    companyName: "",
    appointments: [],
    campaigns: [],
  };

  const [clientDetails, setClientDetails] = useState<IClientDetails>(
    initialClientDetails || emptyClientDetails
  );

  const handleNext = async () => {
    if (modalType === "edit") {
      mutate(clientDetails, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            handleClose();
          }
        },
        onError: () => {
          throw new Error();
        },
      });
    } else {
      console.log("other");
    }
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Client Details
        </Typography>
        <React.Fragment>
          <ClientForm
            clientDetails={clientDetails}
            setClientDetails={setClientDetails}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button onClick={handleClose}>CANCEL</Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {"Save"}
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
