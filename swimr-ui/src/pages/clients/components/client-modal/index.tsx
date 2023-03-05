import * as React from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  IClientDetails,
  IClientModalProps,
  ICreateClient,
} from "../../../../interfaces/client";
import ClientForm from "../client-form";
import useUpdateClientDetails from "../../../../hooks/useUpdateClientDetails";
import { useState } from "react";
import { StatusCodes } from "http-status-codes";
import useCreateClient from "../../../../hooks/useCreateClient";
import { toast } from "react-hot-toast";

export default function EditClientModal(props: IClientModalProps) {
  const { handleClose, selectedClient, modalType } = props;
  const { mutate } = useUpdateClientDetails();
  const { mutate: mutateCreate } = useCreateClient();

  const initialClientDetails = selectedClient;
  const emptyClientDetails = {
    clientId: 0,
    clientName: "",
    emailAddress: "",
    companyName: "",
    appointments: [],
    campaigns: [],
    users: {
      id: 0,
      user_id: 0,
      client_id: 0,
      users: {
        id: 0,
        user_name: "",
        email: "",
        user_password: "",
        user_level_id: 0,
      },
    },
  };

  const [clientDetails, setClientDetails] = useState<IClientDetails>(
    initialClientDetails || emptyClientDetails
  );

  const handleNext = async (values: IClientDetails) => {
    if (modalType === "edit") {
      mutate(values, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            toast.success("Client successfully updated");
            handleClose();
          }
        },
        onError: () => {
          toast.error("Client could not be updated");
          throw new Error();
        },
      });
    } else if (modalType === "create") {
      const createObj: ICreateClient = {
        client_name: clientDetails.clientName,
        company_name: clientDetails.companyName,
        email: clientDetails.emailAddress,
        user_id: clientDetails.users.user_id,
      };

      mutateCreate(createObj, {
        onSuccess: (response) => {
          if (response.status === StatusCodes.OK) {
            handleClose();
            toast.success("Client created successfully");
          }
        },
        onError: () => {
          toast.success("Client could not be successfully created");
          throw new Error();
        },
      });
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
            handleClose={handleClose}
            handleSubmit={handleNext}
            setClientDetails={setClientDetails}
          />
        </React.Fragment>
      </Paper>
    </Container>
  );
}
