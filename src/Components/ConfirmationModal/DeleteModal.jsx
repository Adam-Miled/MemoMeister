import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export default function DeleteDialog({
  deleteModal,
  modalType,
  open,
  setOpen,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={setOpen}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Sie sind dabei, " + modalType + "zu löschen."}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Das Löschen dieses Elements kann zu Unstimmigkeiten in Ihrer Arbeit
          führen. Sind Sie sicher?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={setOpen}>
          Abbrechen
        </Button>
        <Button onClick={deleteModal} autoFocus>
          Bestätigen
        </Button>
      </DialogActions>
    </Dialog>
  );
}