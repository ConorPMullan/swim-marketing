import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SwimrLogo250 from "../../assets/logo/swimrlogo250";
import { axiosInstance } from "../../integration/Instance";
import useTokens from "../../hooks/useTokens";
import { DrawerPaper } from "./styled";

const Home = () => {
  const { clearLocalStorageTokens } = useTokens();
  const getUsers = () => {
    axiosInstance.get("/api/users");
  };

  return (
    <Grid container component="main">
      <Grid item xs={12} component={DrawerPaper} elevation={0} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SwimrLogo250 style={{ margin: "50px 0" }} />
          <Typography component="h1" variant="h5">
            Home Page
          </Typography>
          <Button onClick={getUsers}>Test this</Button>
          <Button onClick={clearLocalStorageTokens}>Sign Out</Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
