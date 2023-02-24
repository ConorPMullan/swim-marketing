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

const Copyright = (props: any) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Swimr Marketing
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const Login = () => {
  const { mutate } = useAuth();
  const { checkIfValidToken } = useTokens();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const userDetails = {
      email: String(formData.get("email")) || "",
      password: String(formData.get("password")) || "",
    };

    mutate(userDetails, {
      onSuccess: (response) => {
        if (response.status === StatusCodes.OK) {
          checkIfValidToken(response.data);
        }
      },
      onError: () => {
        throw new Error();
      },
    });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
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
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
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
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
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

export default Login;
