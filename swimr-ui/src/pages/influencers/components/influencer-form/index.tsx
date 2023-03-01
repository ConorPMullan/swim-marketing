import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Autocomplete } from "@mui/material";
import { IInfluencers } from "../../../../interfaces/influencer";
import { useState } from "react";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import useGetClients from "../../../../hooks/useGetClients";
import { DateTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface IInfluencerForm {
  selectedInfluencer: IInfluencers | undefined;
}

export default function InfluencerForm(props: IInfluencerForm) {
  const { selectedInfluencer } = props;
  const { data } = useGetClients();
  console.log("SD:", selectedInfluencer?.startDate);
  console.log("SD:", dayjs(selectedInfluencer?.startDate));
  const [startDateValue, setStartDateValue] = React.useState<Dayjs | null>(
    dayjs(selectedInfluencer?.startDate)
  );
  const [endDateValue, setEndDateValue] = React.useState<Dayjs | null>(
    dayjs(selectedInfluencer?.endDate)
  );

  const [influencerName, setInfluencerName] = useState(
    selectedInfluencer?.influencerName || ""
  );
  const [companyName, setCompanyName] = useState(
    selectedInfluencer?.companyName || ""
  );

  const clientOptions = data?.data.map((client) => {
    return { label: client.clientName, value: client.clientName };
  });

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="influencerName"
            name="influencerName"
            label="Influencer Name"
            fullWidth
            autoComplete="given-name"
            variant="standard"
            value={influencerName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfluencerName(event.target.value);
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

        <Grid item sm={6} xs={12}>
          <DateTimePicker
            value={startDateValue}
            onChange={(newValue) => {
              setStartDateValue(newValue);
            }}
            label="Start Date/Time"
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  svg: { color: "#fff" },
                  input: { color: "#fff" },
                }}
              />
            )}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <DateTimePicker
            value={endDateValue}
            onChange={(newValue) => {
              setEndDateValue(newValue);
            }}
            label="End Date/Time"
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{
                  svg: { color: "#fff" },
                  input: { color: "#fff" },
                }}
              />
            )}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-user"
            options={clientOptions || []}
            renderInput={(params) => (
              <TextField {...params} label="Client Name" />
            )}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
