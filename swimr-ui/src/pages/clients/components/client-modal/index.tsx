import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "../client-form";
import { IClient } from "../../../../interfaces/client";
import ClientForm from "../client-form";

function getStepContent(selectedClient: IClient) {
  return <ClientForm selectedClient={selectedClient} />;
}

interface ICheckoutProps {
  handleClose: () => void;
  selectedClient: IClient | undefined;
  modalType: string;
}

export default function EditClientModal(props: ICheckoutProps) {
  const { handleClose, selectedClient, modalType } = props;
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    if (modalType === "edit") {
      console.log("editted");
    } else {
      console.log("saved");
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container component="div" sx={{ mb: 4 }}>
      <Paper elevation={0} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography component="h1" variant="h4" align="center">
          Client Details
        </Typography>
        <React.Fragment>
          <ClientForm selectedClient={selectedClient} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Button onClick={handleClose}>CANCEL</Button>
            <Button
              variant="contained"
              onClick={handleNext}
              sx={{ mt: 3, ml: 1 }}
            >
              {"Save"}
            </Button>
          </Box>
        </React.Fragment>
      </Paper>
    </Container>
  );
}
