import React from 'react';

const Logo = (props) => {
  return <img alt="Logo" src="/memomeisterLogo.svg" style={{ width: '90px', height: '90px', objectFit: 'contain' }} {...props} />;
};

export default Logo;
