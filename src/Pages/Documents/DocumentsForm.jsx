import {
  Button,
  DialogActions,
  Grid,
  InputLabel,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Input,
} from "@mui/material";
import React, { useState } from "react";
import { styles } from "./DocumentsPage.styles";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import {
  createDocumentText,
  createFileDocument,
} from "../../Utilities/DocumentUtilities/CreationUtilities";

function DocumentsForm({ modifiedDocument, mode, handleClose }) {
  const [documentData, setDocumentData] = useState(modifiedDocument || {});
  const [selectedType, setSelectedType] = useState(
    mode === "Bearbeiten" || mode === "aus Kopie erstellen" ? 0 : false
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      let response;

      if (selectedType === 0) {
        const textContent = documentData.textContent;
        const backgroundColor = documentData.textContentBackground;
        response = await createDocumentText(textContent, backgroundColor);
      } else if (selectedType === 1) {
        if (!selectedFile) {
          console.error("No file selected for upload.");
          return;
        }
        response = await createFileDocument(selectedFile);
      }

      const storedDocuments =
        JSON.parse(localStorage.getItem("documents")) || [];

      if (mode !== "Bearbeiten") {
        storedDocuments.push(response);
        localStorage.setItem("documents", JSON.stringify(storedDocuments));
      } else {
        const updatedFolders = storedDocuments.map((document) =>
          document.id === response.id ? response : document
        );
        localStorage.setItem("documents", JSON.stringify(updatedFolders));
      }

      window.location.reload();
    } catch (error) {
      console.error("Error creating document:", error);
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
              <Typography sx={styles.Inputs}>{modifiedDocument?.id}</Typography>
            </Grid>
          </Grid>
        </>
      )}
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={8} align="left">
          <InputLabel htmlFor="format-input">Dateityp :</InputLabel>
        </Grid>
        <Grid item xs={10} align="left">
          <FormControl fullWidth>
            <Select
              sx={styles.Inputs}
              id="type-select"
              value={mode === "Bearbeiten" ? 0 : selectedType}
              onChange={handleChange}
            >
              <MenuItem value={0}>Textdokument</MenuItem>
              <MenuItem value={1}>Datei-Dokument</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      {selectedType === 0 && (
        <>
          <Grid item xs={2} align="left">
            <InputLabel htmlFor="format-input">Textinhalt :</InputLabel>
          </Grid>
          <Grid item xs={10} align="left">
            <TextField
              id="outlined-number"
              sx={styles.Inputs}
              autoComplete="off"
              value={documentData?.textContent || ""}
              onChange={(e) => {
                setDocumentData({
                  ...documentData,
                  textContent: e.target.value,
                });
              }}
            />
          </Grid>
          <Grid item xs={2} align="left">
            <InputLabel htmlFor="format-input">Hintergrundfarbe :</InputLabel>
          </Grid>
          <Grid item xs={10} align="left">
            <TextField
              id="outlined-number"
              sx={styles.Inputs}
              autoComplete="off"
              value={documentData?.textContentBackground || ""}
              onChange={(e) => {
                setDocumentData({
                  ...documentData,
                  textContentBackground: e.target.value,
                });
              }}
            />
          </Grid>
        </>
      )}
      {selectedType === 1 && (
        <Grid item xs={12} align="left">
          <InputLabel htmlFor="file-upload">Datei hochladen :</InputLabel>
          <Input
            id="file-upload"
            type="file"
            sx={styles.Inputs}
            onChange={(e) => {
              const file = e.target.files[0];
              setSelectedFile(file);
            }}
          />
        </Grid>
      )}
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          ABBRECHEN
        </Button>
        <Button
          sx={styles.ConfirmButton}
          startIcon={<DoneAllIcon />}
          onClick={handleSubmit}
          variant="contained"
        >
          BESTÄTIGEN
        </Button>
      </DialogActions>
    </>
  );
}

export default DocumentsForm;
