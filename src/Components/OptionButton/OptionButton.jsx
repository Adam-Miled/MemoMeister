import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { styles } from "./OptionButton.styles";
import { Link } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function OptionButton({ title, icon: Icon, link }) {
  return (
    <Link to={'/'+link} style={styles.Wrapper}>
      <Button sx={styles.ButtonBox}>
        <Typography sx={styles.Title} className="Text">{title}</Typography>
        <Icon sx={styles.Icon} className="Icon" />
        <Box sx={styles.ActionBox}>
        <Typography sx={styles.ActionText} className="Text"> Tool öffnen </Typography>
        <ArrowRightIcon sx={styles.ActionIcon}/>
        </Box>
      </Button>
    </Link>
  );
}

export default OptionButton;
