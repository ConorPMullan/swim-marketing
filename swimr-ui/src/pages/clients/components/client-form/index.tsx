import React from "react";
import Grid from "@mui/material/Grid";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { Autocomplete, Button } from "@mui/material";
import useGetAllUsers from "../../../../hooks/useGetAllUsers";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { IClientDetails } from "../../../../interfaces/client";

interface IClientForm {
  clientDetails: IClientDetails;
  setClientDetails: (values: IClientDetails) => void;
  handleClose: () => void;
  handleSubmit: () => void;
}

export default function ClientForm(props: IClientForm) {
  const { clientDetails, setClientDetails } = props;
  const { data } = useGetAllUsers();
  const { handleSubmit, handleClose } = props;
  const userOptions = data?.data.map((user) => {
    return { label: user.userName, value: user.userId };
  });

  return (
    <React.Fragment>
      <Formik
        initialValues={clientDetails}
        onSubmit={(values) => {
          setClientDetails(values);
          handleSubmit();
        }}
        validationSchema={Yup.object().shape({
          clientName: Yup.string().required("Required"),
          emailAddress: Yup.string()
            .email("Invalid email")
            .required("Required"),
          companyName: Yup.string().required("Required"),
        })}
      >
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  required
                  id="clientName"
                  name="clientName"
                  label="Client name"
                  fullWidth
                  autoComplete="given-name"
                  variant="standard"
                  error={errors.clientName && touched.clientName}
                  helperText={
                    errors.clientName && touched.clientName && errors.clientName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  required
                  id="client-email-txt-field"
                  name="emailAddress"
                  label="Client Email"
                  fullWidth
                  autoComplete="email"
                  variant="standard"
                  error={errors.emailAddress && touched.emailAddress}
                  helperText={
                    errors.emailAddress &&
                    touched.emailAddress &&
                    errors.emailAddress
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={TextField}
                  required
                  id="company-name-txt-field"
                  name="companyName"
                  label="Company Name"
                  fullWidth
                  autoComplete="company"
                  variant="standard"
                  error={errors.companyName && touched.companyName}
                  helperText={
                    errors.companyName &&
                    touched.companyName &&
                    errors.companyName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  as={Autocomplete}
                  disablePortal
                  id="combo-box-user"
                  options={userOptions || []}
                  getOptionLabel={(option: { label: any; value: any }) =>
                    option.label || ""
                  }
                  renderInput={(
                    params: JSX.IntrinsicAttributes & TextFieldProps
                  ) => <TextField {...params} label="Swimr Contact" />}
                />
              </Grid>
            </Grid>
            <Grid sx={{ display: "flex", justifyContent: "flex-end", my: 3 }}>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Submit</Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </React.Fragment>
  );
}
