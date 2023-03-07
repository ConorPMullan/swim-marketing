import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwimrLogo250 from "../../assets/logo/swimrlogo250";
import "../../index.css";
import wave from "../../assets/logo/wave.svg";
import useAuth from "../../hooks/useAuth";
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

            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
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
                label="Email Address"
                name="email"
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
                id="password"
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
                autoComplete="confirm-password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
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
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs />
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </BackgroundGrid>
    </Grid>
  );
};

export default SignUp;
