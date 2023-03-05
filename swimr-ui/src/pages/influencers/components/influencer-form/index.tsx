import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete, Box, Button, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

interface IInfluencerForm {
  handleSubmit: (values: any) => void;
  handleClose: () => void;
}

export default function InfluencerForm(props: IInfluencerForm) {
  const { handleSubmit, handleClose } = props;
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

  const validationSchema = Yup.object().shape({
    influencer_name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    platform_id: Yup.number().required("Required"),
    price_per_post: Yup.string().required("Required"),
    is_active: Yup.boolean().required("Required"),
  });

  const initialVals = {
    influencer_name: "",
    email: "",
    platform_id: undefined,
    price_per_post: "",
    is_active: true,
  };

  const formik = useFormik({
    initialValues: initialVals,
    onSubmit: (values) => {
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
              id="influencer_name"
              name="influencer_name"
              label="Influencer Name"
              fullWidth
              autoComplete="given-name"
              variant="outlined"
              value={formik.values.influencer_name}
              onChange={formik.handleChange}
              error={
                formik.touched.influencer_name &&
                Boolean(formik.errors.influencer_name)
              }
              helperText={
                formik.touched.influencer_name && formik.errors.influencer_name
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="influencer_email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="email"
              variant="outlined"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              disablePortal
              id="combo-box-user"
              options={platformOptions || []}
              renderInput={(params) => (
                <TextField {...params} label="Platform" />
              )}
              isOptionEqualToValue={(option, value) =>
                option.value === value.value
              }
              onChange={(e, newValue) => {
                formik.setFieldValue("platform_id", newValue?.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Price Per Post"
              id="standard-start-adornment"
              name="price_per_post"
              sx={{ m: 1 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">£</InputAdornment>
                ),
              }}
              fullWidth
              variant="outlined"
              value={formik.values.price_per_post}
              onChange={formik.handleChange}
              error={
                formik.touched.price_per_post &&
                Boolean(formik.errors.price_per_post)
              }
              helperText={
                formik.touched.price_per_post && formik.errors.price_per_post
              }
            />
          </Grid>
          <Grid sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">SAVE</Button>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
}
