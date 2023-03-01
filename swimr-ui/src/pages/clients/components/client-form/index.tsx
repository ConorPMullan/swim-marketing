import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";
import { IClient } from "../../../../interfaces/client";
import { useState } from "react";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";

interface IClientForm {
  selectedClient: IClient | undefined;
}

export default function ClientForm(props: IClientForm) {
  const { selectedClient } = props;
  const { data } = useGetAllUsers();
  const clientNames = selectedClient?.clientName.split(" ");
  const [clientFirstName, setClientFirstName] = useState(
    clientNames ? clientNames[0]! : ""
  );
  const [clientSurname, setClientSurname] = useState(
    clientNames ? clientNames[1] : ""
  );
  const [clientEmail, setClientEmail] = useState(
    selectedClient?.emailAddress || ""
  );
  const [companyName, setCompanyName] = useState(
    selectedClient?.companyName || ""
  );

  const userOptions = data?.data.map((user) => {
    return { label: user.userName, value: user.userId };
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="First name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={clientFirstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientFirstName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Last name"
            fullWidth
            autoComplete="family-name"
            variant="standard"
            value={clientSurname}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientSurname(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="client-email-txt-field"
            name="client-email-txt-field"
            label="Client Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={clientEmail}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setClientEmail(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="company-name-txt-field"
            name="company-name-txt-field"
            label="Company Name"
            fullWidth
            autoComplete="company"
            variant="standard"
            value={companyName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setCompanyName(event.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-user"
            options={userOptions || []}
            renderInput={(params) => (
              <TextField {...params} label="Swimr Contact" />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
