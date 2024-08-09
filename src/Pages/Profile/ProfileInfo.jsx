import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styles } from "./ProfileInfo.styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { fetchUserProfileFull } from "../../Utilities/ProfileUtilities";

function ProfileInfo() {
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchUserProfileFull();
        setUserProfile(profile.me);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  const getPosition = (positionCode) => {
    switch (positionCode) {
      case 0:
        return "User";
      case 10:
        return "Owner";
      default:
        return "User";
    }
  };
  return (
    <>
      <Grid sx={styles.TitleWrapper}>
        <Typography sx={styles.TitleText}>Mein Profil</Typography>
      </Grid>
      <Box sx={styles.Wrapper}>
        <Box sx={{ marginBottom: "80px" }}>
          {userProfile ? (
            <img
              src={userProfile.avatar}
              alt="User Avatar"
              style={{ width: "90px", height: "90px", borderRadius: "50%" }}
            />
          ) : (
            <AccountCircleIcon fontSize="medium" sx={{ color: "white" }} />
          )}
          <Typography variant="h6" sx={styles.TitleText}>
            {userProfile.fullName}
          </Typography>
        </Box>
        <Box sx={styles.TwoElementsWrapper}>
          <TextField
            sx={{
              ...styles.inputField,
              "& input": {
                cursor: "default",
              },
            }}
            variant="outlined"
            fullWidth
            label="Vorname"
            value={userProfile.firstName}
          />
          <TextField
            sx={{
              ...styles.inputField,
              "& input": {
                cursor: "default",
              },
            }}
            variant="outlined"
            fullWidth
            label="Nachname"
            value={userProfile.lastName}
          />
        </Box>
        <TextField
          sx={{
            ...styles.inputField,
            "& input": {
              cursor: "default",
            },
          }}
          variant="outlined"
          fullWidth
          label="Telefonnummer"
          value={userProfile.phoneNumber || "N/A"}
        />
        <TextField
          sx={{
            ...styles.inputField,
            "& input": {
              cursor: "default",
            },
          }}
          variant="outlined"
          fullWidth
          label="E-Mail"
          value={userProfile.primaryEmail}
          InputProps={{ readOnly: true }}
        />
        <TextField
          sx={{
            ...styles.inputField,
            "& input": {
              cursor: "default",
            },
          }}
          variant="outlined"
          fullWidth
          label="Aktuelle Unternehmensrolle"
          value={getPosition(userProfile.activeCompanyRole)}
        />
      </Box>
    </>
  );
}

export default ProfileInfo;