import React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete, Box, Button } from "@mui/material";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { IClientDetails } from "../../../../interfaces/client";

interface IClientForm {
  clientDetails: IClientDetails;
  setClientDetails: (values: IClientDetails) => void;
  handleClose: () => void;
  handleSubmit: (values: IClientDetails) => void;
}

export default function ClientForm(props: IClientForm) {
  const { clientDetails, setClientDetails } = props;
  const { data } = useGetAllUsers();
  const { handleSubmit, handleClose } = props;
  const userOptions = data?.data.map((user) => {
    return { label: user.userName, value: user.userId };
  });
  const validationSchema = Yup.object().shape({
    clientName: Yup.string().required("Required"),
    emailAddress: Yup.string().email("Invalid email").required("Required"),
    companyName: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: clientDetails,
    onSubmit: (values, actions) => {
      setClientDetails(values);
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
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
              value={formik.values.clientName}
              onChange={formik.handleChange}
              error={
                formik.touched.clientName && Boolean(formik.errors.clientName)
              }
              helperText={formik.touched.clientName && formik.errors.clientName}
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
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
              helperText={
                formik.touched.emailAddress && formik.errors.emailAddress
              }
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
              value={formik.values.companyName}
              onChange={formik.handleChange}
              error={
                formik.touched.companyName && Boolean(formik.errors.companyName)
              }
              helperText={
                formik.touched.companyName && formik.errors.companyName
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-user"
              options={userOptions || []}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              renderInput={(params) => (
                <TextField {...params} label="Swimr Contact" />
              )}
              defaultValue={userOptions?.find(
                (user) => user.value === clientDetails.users.user_id
              )}
              onChange={(e, newValue) => {
                formik.setFieldValue(
                  "users.user_id",
                  newValue?.value || clientDetails.users.user_id
                );
              }}
            />
          </Grid>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">SAVE</Button>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
