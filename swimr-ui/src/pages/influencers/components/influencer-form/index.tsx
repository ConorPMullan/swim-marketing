import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete, InputAdornment } from "@mui/material";
import { useState } from "react";

export default function InfluencerForm() {
  const [influencerName, setInfluencerName] = useState("");
  const [influencerEmail, setInfluencerEmail] = useState("");
  const [pricePerPost, setPricePerPost] = useState<number>();
  const platformOptions = [
    { value: 1, label: "Instagram" },
    { value: 2, label: "Snapchat" },
    { value: 3, label: "TikTok" },
    { value: 4, label: "Facebook" },
    { value: 5, label: "Youtube" },
    { value: 6, label: "LinkedIn" },
    { value: 7, label: "Pinterest" },
    { value: 8, label: "Twitter" },
  ];

  const handleChangePrice = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const regex = /^[0-9\b]+$/;
    if (e.target.value === "" || regex.test(e.target.value)) {
      setPricePerPost(Number(e.target.value));
    }
  };

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
            id="influencerEmail"
            name="influencerEmail"
            label="Email"
            fullWidth
            autoComplete="email"
            variant="standard"
            value={influencerEmail}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfluencerEmail(event.target.value);
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            disablePortal
            id="combo-box-user"
            options={platformOptions || []}
            renderInput={(params) => <TextField {...params} label="Platform" />}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Price Per Post"
            id="standard-start-adornment"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">£</InputAdornment>
              ),
            }}
            variant="standard"
            onChange={(e) => handleChangePrice(e)}
            value={pricePerPost}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
