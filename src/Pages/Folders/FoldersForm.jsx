import {
  Button,
  DialogActions,
  Grid,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "./FoldersPage.styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { createFolder, updateFolder } from "../../Utilities/FolderUtilities";

function FoldersForm({
  modifiedFolder,
  mode,
  handleClose,
}) {
  const [folderData, setFolderData] = useState(modifiedFolder || {});

  const handleSubmit = async () => {
    try {
      let response;
  
      if (mode !== 'Bearbeiten') {
        response = await createFolder({
          name: folderData.name,
          description: folderData.description,
          labels: folderData.labels,
          emoteIcon: folderData.emoteIcon,
        });
      } else {
        response = await updateFolder({
          id: folderData.id,
          name: folderData.name,
          description: folderData.description,
          labels: folderData.labels,
        });
      }
  
      const storedFolders = JSON.parse(localStorage.getItem('folders')) || [];
  
      if (mode !== 'Bearbeiten') {
        storedFolders.push(response);
        localStorage.setItem('folders', JSON.stringify(storedFolders));
      } else {
        const updatedFolders = storedFolders.map((folder) =>
          folder.id === response.id ? response : folder
        );
        localStorage.setItem('folders', JSON.stringify(updatedFolders));
      }
  
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };  

  return (
    <>
      {mode === "Bearbeiten" && (
        <>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={2} align="left">
              <InputLabel htmlFor="format-input">Id :</InputLabel>
            </Grid>
            <Grid item xs={10} align="left">
              <Typography sx={styles.Inputs}>{folderData?.id}</Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid item xs={2} align="left">
        <InputLabel htmlFor="format-input">Name* :</InputLabel>
      </Grid>
      <Grid item xs={10} align="left">
        <TextField
          helperText={!folderData?.name && "This field is required."}
          id="outlined-number"
          sx={styles.Inputs}
          autoComplete="off"
          value={folderData?.name || ""}
          onChange={(e) =>
            setFolderData({ ...folderData, name: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={2} align="left">
        <InputLabel htmlFor="format-input">Beschreibung :</InputLabel>
      </Grid>
      <Grid item xs={10} align="left">
        <TextField
          id="outlined-number"
          sx={styles.Inputs}
          autoComplete="off"
          value={folderData?.description || ""}
          onChange={(e) =>
            setFolderData({ ...folderData, description: e.target.value })
          }
        />
      </Grid>
      <Grid item xs={2} align="left">
        <InputLabel htmlFor="format-input">Labels :</InputLabel>
      </Grid>
      <Grid item xs={10} align="left">
        <TextField
          id="labels-input"
          sx={styles.Inputs}
          autoComplete="off"
          value={(folderData?.labels || []).join(", ")}
          onChange={(e) => {
            const inputValue = e.target.value;
            const labels = inputValue
              .split(",")
              .map((label) => label.trim())
              .filter((label) => label !== "");

            setFolderData({ ...folderData, labels });
          }}
        />
      </Grid>
      <Grid item xs={2} align="left">
        <InputLabel htmlFor="format-input">Emoticon :</InputLabel>
      </Grid>
      <Grid item xs={10} align="left">
        <TextField
          id="outlined-number"
          sx={styles.EmoticonInput}
          autoComplete="off"
          value={folderData?.emoteIcon || ""}
          onChange={(e) =>
            setFolderData({ ...folderData, emoteIcon: e.target.value })
          }
        />
      </Grid>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          ABBRECHEN
        </Button>
        <Button
          onClick={handleSubmit}
          startIcon={<DoneAllIcon />}
          variant="contained"
          color="primary"
        >
          BESTÄTIGEN
        </Button>
      </DialogActions>
    </>
  );
}

export default FoldersForm;
