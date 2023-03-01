import { Box, Modal } from "@mui/material";
import React, { ReactNode } from "react";

interface IModalOpen {
  open: boolean;
  handleClose: () => void;
  children: ReactNode;
}
const ModalComponent = (props: IModalOpen) => {
  const { open, handleClose, children } = props;
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "#121212",
    borderRadius: "15px",
    boxShadow: 24,
    padding: 0,
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>{children}</Box>
    </Modal>
  );
};

export default ModalComponent;
