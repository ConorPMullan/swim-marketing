import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SwimrLogo140 from "../../assets/logo/swimr-logo-140";
import AppBarMenu from "../icon-menu/menu";

interface INavBarProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const NavBar = (props: INavBarProps) => {
  const { open, handleDrawerOpen } = props;
  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar
      position="fixed"
      elevation={0}
      open={open}
      style={{ backgroundColor: "transparent", display: "flex" }}
    >
      <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <SwimrLogo140 />
        </div>
        <div data-testid="icon-menu">
          <AppBarMenu />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
