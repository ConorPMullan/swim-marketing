import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import wave from "../../assets/logo/wave.svg";
import { StatusCodes } from "http-status-codes";
import useTokens from "../../hooks/useTokens";
import { BackgroundGrid, StyledPaper } from "./styled";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
import SwimrLogo140 from "../../assets/logo/swimr-logo-140";
import useCreateUser from "../../hooks/useCreateUser";
import { useNavigate } from "react-router-dom";

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      Swimr Marketing {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const SignUp = () => {
  const { mutate } = useCreateUser();
  const navigate = useNavigate();
  const { checkIfValidToken } = useTokens();
  /* istanbul ignore next */
  const handleSubmit = async (values: any) => {
    const createUser = {
      email: values.email,
      user_name: values.name,
      user_password: values.password,
    };
    const handleToastClose = () => {
      navigate("/login");
    };
    mutate(createUser, {
      onSuccess: (response) => {
        if (response.status === StatusCodes.OK) {
          checkIfValidToken(response.data);
          toast.success(
            "User Successfully Created. You can now login using your credentials"
          );
          setTimeout(() => {
            handleToastClose();
          }, 3000);
        }
      },
      onError: () => {
        toast.error("Login Failed. Please check your credentials");
        throw new Error();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Toaster />
      <BackgroundGrid
        item
        width={"100%"}
        data-testid="signup-page-bg"
        sx={{
          backgroundImage: `url(${wave})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          color: "white",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          data-testid="signup-page-container"
          component={StyledPaper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 3,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "white",
            }}
          >
            <SwimrLogo140 style={{ margin: "10px 0" }} />

            <Typography
              data-testid="signup-page-heading"
              component="h1"
              variant="h5"
            >
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              data-testid="signup-page-form"
              onSubmit={formik.handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
                data-testid="signup-page-name"
                inputProps={{
                  "data-testid": "signup-name-field",
                }}
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                data-testid="signup-page-email"
                inputProps={{
                  "data-testid": "signup-email-field",
                }}
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="Password"
                data-testid="signup-page-password"
                inputProps={{
                  "data-testid": "signup-password-field",
                }}
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                data-testid="signup-page-confirm-password"
                autoComplete="confirm-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                inputProps={{
                  "data-testid": "signup-confirm-password-field",
                }}
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                }
              />
              <Button
                type="submit"
                fullWidth
                data-testid="signup-btn"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </BackgroundGrid>
    </Grid>
  );
};

export default SignUp;
