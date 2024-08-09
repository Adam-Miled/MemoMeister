import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { styles } from "./DocumentsPage.styles";
import DocumentsForm from "./DocumentsForm";

export default function DocumentsModal({
  modifiedDocument,
  mode,
  handleClose,
  open,
}) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={{ ...styles.Modal, marginBottom: "20px" }}>
            <Typography
              id="transition-modal-title"
              sx={{ ...styles.TitleText, marginBottom: "18px" }}
            >
              - Dokument {mode} -
            </Typography>
            <DocumentsForm
              modifiedDocument={modifiedDocument}
              mode={mode}
              handleClose={handleClose}
            />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}