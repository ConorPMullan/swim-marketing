import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import NavBar from "./nav-bar";
import NavDrawer from "./drawer";
import { Toaster } from "react-hot-toast";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  backgroundColor: "transparent",
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface IMiniDrawer {
  children: React.ReactNode;
}

const PageLayout = ({ children }: IMiniDrawer) => {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        backgroundImage: "linear-gradient(to right, #00b4db, #0083b0);",
      }}
    >
      <div>
        <Toaster />
      </div>
      <NavBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <NavDrawer open={open} handleDrawerClose={handleDrawerClose} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
