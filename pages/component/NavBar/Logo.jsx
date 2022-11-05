import React from 'react';

import Avatar from '@mui/material/Avatar';

const Logo = () => (
  <Avatar
    to='/'
    sx={{ marginRight: 3, height: 64 }}
    src='../assets/img/lanus-logo.svg'
    alt='LanusLogo'
    loading='lazy'
    variant='rounded'
  />
);

export default Logo;
