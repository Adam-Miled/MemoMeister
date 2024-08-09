import React from "react";
import { Tooltip } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import MoveIcon from "@mui/icons-material/MoveUp";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styles } from "../../Pages/Documents/DocumentsPage.styles";

function DocumentsActionButtons({ onEdit, onCopy, onDelete }) {
  return (
    <>
      <Tooltip title="Aus Kopie erstellen" placement="left">
        <ContentCopyIcon sx={styles.ActionButtons} onClick={onCopy} />
      </Tooltip>
      <Tooltip title="Dokument bearbeiten" placement="left">
        <EditOutlinedIcon sx={styles.ActionButtons} onClick={onEdit} />
      </Tooltip>
      <Tooltip title="In Ordner verschieben" placement="left">
        <MoveIcon sx={styles.ActionButtons} />
      </Tooltip>
      <Tooltip title="Löschen" placement="left">
        <DeleteOutlineIcon
          sx={{ ...styles.ActionButtons, color: "rgba(236, 22, 66, 0.6)" }}
          onClick={onDelete}
        />
      </Tooltip>
    </>
  );
}

export default DocumentsActionButtons;
