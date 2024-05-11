import { Theme } from '@mui/material/styles';



export const markClassesMapping: {
    [index: string]: { [subindex: string]: string };
  } = {
    center: {
      h1: '',
      h2: 'OnePirateTypography-markedH2Center',
      h3: 'OnePirateTypography-markedH3Center',
      h4: 'OnePirateTypography-markedH4Center',
      h5: '',
      h6: '',
    },
    left: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: 'OnePirateTypography-markedH6Left',
    },
    none: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      h5: '',
      h6: '',
    },
  };
  
  export const styles = ({ theme }: { theme: Theme }) => ({
    [`& .${markClassesMapping.center.h2}`]: {
      height: 4,
      width: 100,
      display: 'block',
      margin: `${theme.spacing(1)} auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [`& .${markClassesMapping.center.h3}`]: {
      height: 4,
      width: 55,
      display: 'block',
      margin: `${theme.spacing(1)} auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [`& .${markClassesMapping.center.h4}`]: {
      height: 4,
      width: 55,
      display: 'block',
      margin: `${theme.spacing(1)} auto 0`,
      backgroundColor: theme.palette.secondary.main,
    },
    [`& .${markClassesMapping.left.h6}`]: {
      height: 2,
      width: 28,
      display: 'block',
      marginTop: theme.spacing(0.5),
      background: 'currentColor',
    },
  });

  export const variantMapping = {
    h1: 'h1',
    h2: 'h1',
    h3: 'h1',
    h4: 'h1',
    h5: 'h3',
    h6: 'h2',
    subtitle1: 'h3',
  };
  
  
  export const images = [
    {
      url: 'https://images.unsplash.com/photo-1534081333815-ae5019106622?auto=format&fit=crop&w=400',
      title: 'Sea',
      width: '20%',
    },
    {
      url: 'https://images.unsplash.com/photo-1506941433945-99a2aa4bd50a?auto=format&fit=crop&w=400',
      title: 'Country Side',
      width: '25%',
    },
    {
      url: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=400',
      title: 'Mountain',
      width: '30%',
    },
    {
      url: 'https://images.unsplash.com/photo-1453747063559-36695c8771bd?auto=format&fit=crop&w=400',
      title: 'City',
      width: '15%',
    }
  ];

  export default {
    markClassesMapping,
    styles,
    variantMapping,
    images
  };


