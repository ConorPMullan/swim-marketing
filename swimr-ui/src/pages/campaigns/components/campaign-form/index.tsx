import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ICampaign } from "../../../../interfaces/campaign";
import { useEffect, useState } from "react";
import useGetClients from "../../../../hooks/useGetClients";
import { DateTimePicker } from "@mui/x-date-pickers";
import useGetInfluencers from "../../../../hooks/useGetInfluencers";
import { useFormik } from "formik";
import * as Yup from "yup";

interface ICampaignForm {
  selectedCampaign: ICampaign | undefined;
  handleClose: () => void;
  handleSubmit: (values: any) => void;
  modalType: string;
}

export default function CampaignForm(props: ICampaignForm) {
  const { selectedCampaign, handleClose, handleSubmit, modalType } = props;
  const campaignDetails = selectedCampaign;
  const { data } = useGetClients();
  const { data: influencers } = useGetInfluencers();

  const clientOptions = data?.data.map((client) => {
    return {
      label: `${client.clientName} (${client.companyName})`,
      value: client.clientId,
    };
  });

  const selectedClient = campaignDetails
    ? {
        label: `${campaignDetails?.client?.client_name} (${campaignDetails?.companyName})`,
        value: campaignDetails?.client?.id || 0,
      }
    : undefined;

  const influencerOptions = influencers?.data.map((influencer) => {
    return { label: influencer.influencerName, value: influencer.influencerId };
  });

  const campaignInfluencers = campaignDetails?.influencers?.map(
    (influencer) => {
      return influencer.influencer_id;
    }
  );

  const [selectedValues, setSelectedValues] = useState<number[]>(
    campaignInfluencers || []
  );
  const validationSchema = Yup.object().shape({
    campaignId: Yup.number().required("Required"),
    campaignName: Yup.string().required("Required"),
    endDate: Yup.string().required("Required"),
    startDate: Yup.string().required("Required"),
    companyName: Yup.string(),
    influencers: Yup.array(),
  });

  const emptyCampaignDetails = {
    endDate: "",
    startDate: "",
    campaignId: 0,
    campaignName: "",
    companyName: "",
    influencers: [],
    client: { id: 0, client_name: "", company_name: "", email: "" },
  };
  const formik = useFormik({
    initialValues:
      modalType === "edit" && campaignDetails
        ? campaignDetails
        : emptyCampaignDetails,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const handleChange = (
    event: SelectChangeEvent<number[]>,
    child: React.ReactNode
  ) => {
    setSelectedValues(event.target.value as number[]);
  };

  useEffect(() => {
    const selectedInfluencers = influencers?.data
      .filter((infOption) => selectedValues.includes(infOption.influencerId))
      .map((filteredOptions) => {
        return {
          id: filteredOptions.influencerId,
          influencer_name: filteredOptions.influencerName,
          is_active: filteredOptions.isActive,
          platform_id: filteredOptions.platform.id,
          email: filteredOptions.email,
        };
      });
    formik.setFieldValue("influencers", selectedInfluencers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues]);

  const getLabelByValue = (value: number) => {
    const item = influencerOptions?.find((inf) => inf.value === value);
    return item ? item.label : "";
  };
  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="campaignName"
              name="campaignName"
              label="Campaign Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              value={formik.values.campaignName}
              onChange={formik.handleChange}
              error={
                formik.touched.campaignName &&
                Boolean(formik.errors.campaignName)
              }
              helperText={
                formik.touched.campaignName && formik.errors.campaignName
              }
            />
          </Grid>

          <Grid item sm={6} xs={12}>
            <DateTimePicker
              value={formik.values.startDate}
              onChange={(value) =>
                formik.setFieldValue("startDate", value, true)
              }
              label="Start Date/Time"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
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
              value={formik.values.endDate}
              onChange={(value) => formik.setFieldValue("endDate", value, true)}
              label="End Date/Time"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                  sx={{
                    svg: { color: "#fff" },
                    input: { color: "#fff" },
                  }}
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            {selectedClient ? (
              <Autocomplete
                disablePortal
                id="combo-box-user-two"
                options={clientOptions || []}
                renderInput={(params) => (
                  <TextField {...params} label="Client (Company)" />
                )}
                defaultValue={selectedClient}
                onChange={(e, newValue) => {
                  formik.setFieldValue("clientId", newValue!.value);
                }}
              />
            ) : (
              <Autocomplete
                disablePortal
                id="combo-box-user-two"
                options={clientOptions || []}
                renderInput={(params) => (
                  <TextField {...params} label="Client (Company)" />
                )}
                onChange={(e, newValue) => {
                  formik.setFieldValue("clientId", newValue!.value);
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {/* <Autocomplete
            disablePortal
            id="combo-box-user"
            options={influencerOptions || []}
            renderInput={(params) => (
              <TextField {...params} label="Influencers" />
            )}
          /> */}
            <FormControl fullWidth sx={{ minWidth: 120 }}>
              <InputLabel id="inf-label">Influencers</InputLabel>
              <Select
                labelId="inf-label"
                id="inf-select"
                multiple
                value={selectedValues}
                onChange={handleChange}
                renderValue={(selected) =>
                  selected.map((value) => getLabelByValue(value)).join(", ")
                }
              >
                {influencerOptions?.map((inf) => (
                  <MenuItem key={inf.value} value={inf.value}>
                    <Checkbox
                      checked={selectedValues.indexOf(inf.value) > -1}
                    />
                    <ListItemText primary={inf.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">SAVE</Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
