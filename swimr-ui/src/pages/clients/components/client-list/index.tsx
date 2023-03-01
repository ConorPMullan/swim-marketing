import { Avatar, Typography } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { StyledList, ClientListItem, ClientName } from "../../styled";

interface IClient {
  clientId: number;
  clientName: string;
  companyName: string;
  emailAddress: string;
}

interface IClientListProps {
  clientData: IClient[] | undefined;
  selectedClient: IClient | undefined;
  setIsDetailsOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedClient: Dispatch<SetStateAction<IClient | undefined>>;
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
  const { clientData, selectedClient, setIsDetailsOpen, setSelectedClient } =
    props;
  return (
    setSelectedClient && (
      <StyledList>
        {clientData?.map((client) => {
          return (
            <ClientListItem
              key={`client-id-${client.clientId}`}
              onClick={() => {
                setIsDetailsOpen(true);
                setSelectedClient(client);
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
    )
  );
};

export default ClientListComponent;
