import * as React from 'react';
import MuiAppBar, { AppBarProps } from '@mui/material/AppBar';

const Bar = (props: AppBarProps) => {
  return (
    <MuiAppBar elevation={0} position="fixed" {...props} 
    sx={{ backgroundColor: '#7fc7d9', boxShadow: '0px 2px 5px 2px rgba(255, 255, 255, .3)', }}/>
  )
}

export default Bar