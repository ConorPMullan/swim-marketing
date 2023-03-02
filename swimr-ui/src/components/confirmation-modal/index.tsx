import { Box, Button, Grid, Modal } from "@mui/material";
import React, { ReactNode, useState } from "react";
import ModalComponent from "../modal";

interface IConfirmationModalOpen {
  open: boolean;
  handleClose: () => void;
  handleConfirmation: () => void;
  textToDisplay: string;
}

const ConfirmationModal = (props: IConfirmationModalOpen) => {
  return (
    <ModalComponent open={props.open} handleClose={props.handleClose}>
      <Grid container sx={{ my: 5, display: "flex", justifyContent: "center" }}>
        <Grid
          item
          xs={12}
          sx={{ my: 5 }}
          justifyContent={"center"}
          display={"flex"}
          fontSize={30}
        >
          {props.textToDisplay}
        </Grid>
        <Grid item>
          <Button onClick={props.handleClose} size="large">
            CANCEL
          </Button>
          <Button onClick={props.handleConfirmation} size="large">
            YES
          </Button>
        </Grid>
      </Grid>
    </ModalComponent>
  );
};

export default ConfirmationModal;
