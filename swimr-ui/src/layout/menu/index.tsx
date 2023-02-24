import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import ContactsIcon from "@mui/icons-material/Contacts";
import CameraFrontIcon from "@mui/icons-material/CameraFront";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TaskIcon from "@mui/icons-material/Task";
import { StyledTooltip } from "./styled";
import { useNavigate } from "react-router-dom";

interface IMenuProps {
  open: boolean;
}

const NavMenu = (props: IMenuProps) => {
  const { open } = props;
  const navigate = useNavigate();
  const [tooltipOpen, setTooltipOpen] = React.useState<number>(-1);

  const handleTooltipOpen = (index: number) => {
    if (!open) setTooltipOpen(index);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(-1);
  };

  return (
    <List>
      {["Home", "Clients", "Campaigns", "Influencers", "Appointments"].map(
        (text, index) => (
          <StyledTooltip
            key={text}
            $isOpen={open}
            title={text}
            open={tooltipOpen === index}
            onOpen={() => handleTooltipOpen(index)}
            onClose={handleTooltipClose}
            placement="right"
          >
            <ListItem
              key={text}
              disablePadding
              sx={{ display: "block", margin: "50px 0" }}
            >
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  navigate(`/${text.toLowerCase()}`);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {text === "Home" && <HomeIcon />}
                  {text === "Clients" && <ContactsIcon />}
                  {text === "Campaigns" && <TaskIcon />}
                  {text === "Influencers" && <CameraFrontIcon />}
                  {text === "Appointments" && <CalendarMonthIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={{ opacity: open ? 1 : 0, color: "white" }}
                />
              </ListItemButton>
            </ListItem>
          </StyledTooltip>
        )
      )}
    </List>
  );
};

export default NavMenu;
