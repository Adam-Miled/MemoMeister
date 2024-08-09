import { Box, Typography } from "@mui/material";
import React from "react";
import { styles } from "./HomePage.styles";
import OptionButton from "../../Components/OptionButton/OptionButton";
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

function HomePage() {
  return (
    <Box sx={styles.Wrapper}>
      <Typography sx={styles.TitleText}>Was machen wir heute?</Typography>
      <Typography sx={styles.InfoText}>
        Wählen Sie eine der folgenden Optionen, um mit der Arbeit zu beginnen
      </Typography>

      <Box sx={styles.OptionButtonsWrapper}>
        <OptionButton title={"Ordner"} icon={FolderOpenIcon} link={"folders"}/>
        <OptionButton title={"Dokumentieren"} icon={ContentPasteIcon} link={"documents"}/>
      </Box>
    </Box>
  );
}

export default HomePage;
