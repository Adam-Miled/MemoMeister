import React from "react";
import { Tooltip } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { styles } from "../../Pages/Documents/DocumentsPage.styles";

function FoldersActionButtons({
  onEdit,
  onDelete,
  onSetLocation
}) {
  return (
    <>
      <Tooltip title="Ordner bearbeiten" placement="left" onClick={onEdit}>
        <EditOutlinedIcon sx={styles.ActionButtons} />
      </Tooltip>
      <Tooltip title="Löschen" placement="left">
        <DeleteOutlineIcon sx={{...styles.ActionButtons, color:"rgba(236, 22, 66, 0.6)"}} onClick={onDelete} />
      </Tooltip>
    </>
  );
}

export default FoldersActionButtons;
