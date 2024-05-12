import React from 'react'
import MuiSnackbar, { SnackbarProps } from '@mui/material/Snackbar';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';
import { TransitionProps } from '@mui/material/transitions/transition';

  function Transition(
    props: TransitionProps & { children: React.ReactElement<unknown, unknown> },
  ) {
    return <Slide {...props} direction="down" />;
  }
  
  interface ExtraSnackbarProps {
    closeFunc?: () => void;
  }


const SnackBar = (props: SnackbarProps & ExtraSnackbarProps) => {

    const { message, closeFunc, ...other } = props;
  const classes = {
    info: 'MuiSnackbarContent-info',
    close: 'MuiSnackbarContent-close',
  };

  return (
     <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={6000}
      TransitionComponent={Transition}
      message={
        <React.Fragment>
          <InfoIcon className={classes.info} />
          <span>{message}</span>
        </React.Fragment>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          className={classes.close}
          onClick={() => closeFunc && closeFunc()}
        >
          <CloseIcon />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

export default SnackBar