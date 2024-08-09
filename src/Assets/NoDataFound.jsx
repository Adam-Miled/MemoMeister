import { Box } from '@mui/material';
import React from 'react';

const NoDataFound = (props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '30vh',
      }}
    >
      <img alt="noData" src="/NoDataFound.svg" />
    </Box>
  );
};

export default NoDataFound;
