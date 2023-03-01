import React, { SetStateAction, Dispatch } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { IClientDetails } from "../../../../interfaces/client";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";

interface IClientForm {
  clientDetails: IClientDetails;
  setClientDetails: Dispatch<SetStateAction<IClientDetails>>;
}

export default function ClientForm(props: IClientForm) {
  const { clientDetails, setClientDetails } = props;
  const { data } = useGetAllUsers();

  const changeClientDetails = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: keyof IClientDetails
  ) => {
    setClientDetails({
      ...clientDetails,
      [fieldName]: event.target.value,
    });
  };

  const userOptions = data?.data.map((user) => {
    return { label: user.userName, value: user.userId };
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="clientName"
            name="clientName"
            label="Client name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={clientDetails.clientName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              changeClientDetails(event, "clientName");
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
            value={clientDetails.emailAddress}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              changeClientDetails(event, "emailAddress");
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
            value={clientDetails.companyName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              changeClientDetails(event, "companyName");
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
