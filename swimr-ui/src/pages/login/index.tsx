import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwimrLogo250 from "../../assets/logo/swimrlogo250";
// import "../../index.css";
import wave from "../../assets/logo/wave.svg";
import useAuth from "../../hooks/useAuth";
import { StatusCodes } from "http-status-codes";
import useTokens from "../../hooks/useTokens";
import { BackgroundGrid, StyledPaper } from "./styled";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import * as Yup from "yup";
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

const Login = () => {
  const { mutate } = useAuth();
  const { checkIfValidToken } = useTokens();
  const navigate = useNavigate();
  const handleSubmit = async (values: any) => {
    mutate(values, {
      onSuccess: (response) => {
        if (response.status === StatusCodes.OK) {
          toast.success("Login Successful");
          checkIfValidToken(response.data);
        }
      },
      onError: () => {
        toast.error("Login Failed. Please check your credentials");
        throw new Error();
      },
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialValues = { email: "", password: "" };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  return (
    <Grid
      data-testid="login-page"
      container
      component="main"
      sx={{ height: "100vh" }}
    >
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
            <SwimrLogo250 style={{ margin: "50px 0" }} />

            <Typography component="h1" variant="h5">
              Sign in
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
                id="email"
                data-testid="email-login"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                inputProps={{
                  "data-testid": "email-login-field",
                }}
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
                data-testid="password-login"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                inputProps={{
                  "data-testid": "password-login-field",
                }}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="submit"
                fullWidth
                data-testid="sign-in-btn"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    onClick={() => {
                      navigate("/sign-up");
                    }}
                    data-testid="sign-up-link"
                    variant="body2"
                  >
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

export default Login;
