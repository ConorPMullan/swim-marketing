import * as React from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Autocomplete, Box, Button } from "@mui/material";
import { IAppointmentForm, IEvent } from "../../../interfaces/appointment";
import useGetClients from "../../../hooks/useGetClients";
import useGetAllUsers from "../../../hooks/useGetAllUsers";
import { DateTimePicker } from "@mui/x-date-pickers";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";

export default function AppointmentForm(props: IAppointmentForm) {
  const { selectedAppointment, modalType, handleSubmit, handleClose } = props;
  const { data } = useGetAllUsers();
  const { data: clientData } = useGetClients();

  const clientOptions = clientData?.data.map(
    (client: { clientName: any; clientId: any }) => {
      return { label: client.clientName, value: client.clientId };
    }
  );

  const userOptions = data?.data.map((user: { userName: any; userId: any }) => {
    return { label: user.userName, value: user.userId };
  });

  const validationSchema = Yup.object().shape({
    id: Yup.number().required("Required"),
    title: Yup.string().required("Required"),
    start: Yup.date().required("Required"),
    end: Yup.date().required("Required"),
    resourceId: Yup.number().required("Required"),
    location: Yup.string().required("Required"),
  });

  const emptyCampaignDetails: IEvent = {
    id: 0,
    appointment_id: 0,
    title: "",
    start: new Date(),
    end: new Date(),
    resourceId: 0,
    location: "",
    client: {
      id: 0,
      client_name: "",
      email: "",
      company_name: "",
    },
    users: {
      id: 0,
      user_name: "",
      email: "",
      user_level_id: 0,
    },
  };

  const formik = useFormik({
    initialValues:
      modalType === "edit" && selectedAppointment
        ? selectedAppointment
        : emptyCampaignDetails,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: false,
  });

  return (
    <React.Fragment>
      <Box component="form" noValidate onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="appointmentName"
              name="title"
              label="Title"
              fullWidth
              autoComplete="title"
              variant="outlined"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="location-txt-field"
              name="location"
              label="Location"
              fullWidth
              autoComplete="location"
              variant="outlined"
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={formik.touched.location && formik.errors.location}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <DateTimePicker
              label="Start Date/Time"
              value={dayjs(formik.values.start)}
              onChange={(value: any) =>
                formik.setFieldValue("start", value, true)
              }
              //@ts-ignore
              renderInput={(params: any) => (
                <TextField
                  id="start-date-time"
                  name="start"
                  fullWidth
                  {...params}
                  error={formik.touched.start && Boolean(formik.errors.start)}
                  helperText={formik.touched.start && formik.errors.start}
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
              value={dayjs(formik.values.end)}
              onChange={(value: any) =>
                formik.setFieldValue("end", value, true)
              }
              label="End Date/Time"
              //@ts-ignore
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  name="end"
                  error={formik.touched.end && Boolean(formik.errors.end)}
                  helperText={formik.touched.end && formik.errors.end}
                  sx={{
                    svg: { color: "#fff" },
                    input: { color: "#fff" },
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            {clientOptions && (
              <Autocomplete
                disablePortal
                id="combo-box-client"
                options={clientOptions || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="client.id"
                    label="Client Attendee"
                  />
                )}
                defaultValue={clientOptions?.find(
                  (client) => client.value === selectedAppointment?.client.id
                )}
                onChange={(e, newValue) => {
                  formik.setFieldValue(
                    "client.id",
                    newValue?.value || selectedAppointment?.client.id
                  );
                }}
              />
            )}
          </Grid>
          <Grid item xs={12}>
            {userOptions && (
              <Autocomplete
                disablePortal
                id="combo-box-user"
                options={userOptions || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    name="users.id"
                    label="Swimr Contact"
                  />
                )}
                defaultValue={userOptions?.find(
                  (user) => user.value === selectedAppointment?.users.id
                )}
                onChange={(e, newValue) => {
                  formik.setFieldValue(
                    "users.id",
                    newValue?.value || selectedAppointment?.users.id
                  );
                }}
              />
            )}
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
