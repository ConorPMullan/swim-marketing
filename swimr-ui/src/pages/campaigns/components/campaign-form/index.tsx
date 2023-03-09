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
import { useEffect, useState } from "react";
import useGetClients from "../../../../hooks/useGetClients";
import { DateTimePicker } from "@mui/x-date-pickers";
import useGetInfluencers from "../../../../hooks/useGetInfluencers";
import { useFormik } from "formik";
import * as Yup from "yup";
import CustomDateTimePicker from "../../../../components/date-time-picker";
import dayjs from "dayjs";

export interface Influencers {
  id: number;
  influencer_name: string;
  email: string;
  platform_id: number;
  price_per_post: string;
  is_active: boolean;
}
export interface ICampaignInfluencer {
  id: number;
  influencer_id: number;
  campaign_id: number;
  influencer: Influencers;
}

export interface Client {
  id: number;
  client_name: string;
  company_name: string;
  email: string;
}
export interface ICampaign {
  campaignId: number;
  campaignName: string;
  endDate: string;
  startDate: string;
  companyName?: string;
  influencers?: ICampaignInfluencer[];
  client: Client;
}
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
        <Grid data-testid="campaign-form" container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="campaignName"
              name="campaignName"
              label="Campaign Name"
              data-testid="campaign-name-input"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              value={formik.values.campaignName}
              inputProps={{
                "data-testid": "campaign-name-field",
              }}
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
              value={dayjs(formik.values.startDate)}
              onChange={(value: any) =>
                formik.setFieldValue("startDate", value, true)
              }
              label="Start Date/Time"
              sx={{ width: "100%" }}
              //@ts-ignore
              renderInput={(params: any) => (
                <TextField
                  {...params}
                  fullWidth
                  inputProps={{
                    "data-testid": "start-date-picker",
                  }}
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
              value={dayjs(formik.values.endDate)}
              onChange={(value: any) =>
                formik.setFieldValue("endDate", value, true)
              }
              sx={{ width: "100%" }}
              label="End Date/Time"
              //@ts-ignore
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  inputProps={{
                    ...params.inputProps,
                    "data-testid": "end-date-picker",
                  }}
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
                isOptionEqualToValue={(option, value) =>
                  option.value === value.value
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputProps={{
                      ...params.inputProps,
                      "data-testid": "client-select",
                    }}
                    label="Client (Company)"
                  />
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
          <Button onClick={handleClose} data-testid="campaign-form-cancel">
            Cancel
          </Button>
          <Button type="submit" data-testid="campaign-form-submit">
            SAVE
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}
