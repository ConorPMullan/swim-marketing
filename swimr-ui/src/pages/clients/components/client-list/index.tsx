import { Avatar, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { StyledList, ClientListItem, ClientName } from "../../styled";
import useGetClientDetails from "../../../../hooks/useGetClientDetails";

import { IClientDetails } from "../../../../interfaces/client";
import ConfirmationModal from "../../../../components/confirmation-modal";

interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

interface IClientListProps {
  clientData: IClient[] | undefined;
  selectedClient: IClientDetails | undefined;
  setIsDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedClient: Dispatch<SetStateAction<IClientDetails | undefined>>;
}

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
      color: "white",
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const ClientListComponent = (props: IClientListProps) => {
  const { mutate, data: clientDetails } = useGetClientDetails();
  const { clientData, selectedClient, setIsDetailsOpen, setSelectedClient } =
    props;
  const [modalOpen, setModalOpen] = useState(false);
  const handleSelectClient = async (clientId: number) => {
    await mutate(clientId);
    setIsDetailsOpen(true);
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    setSelectedClient(clientDetails?.data);
  }, [clientDetails]);

  clientData?.sort((a: IClient, b: IClient) =>
    a.clientName.localeCompare(b.clientName)
  );

  return (
    <StyledList>
      {clientData?.map((client) => {
        return (
          <ClientListItem
            key={`client-id-${client.clientId}`}
            onClick={() => {
              setModalOpen(true);
              handleSelectClient(client.clientId);
            }}
            $isSelected={client.clientId === selectedClient?.clientId}
          >
            <Avatar {...stringAvatar(client.clientName)} />
            <ClientName>
              <Typography variant="h6">{client.clientName}</Typography>
              <Typography variant="body2">{client.companyName}</Typography>
            </ClientName>
          </ClientListItem>
        );
      })}
    </StyledList>
  );
};

export default ClientListComponent;
