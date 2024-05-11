
import MuiTypography, { TypographyProps } from '@mui/material/Typography';
import Typografy from '../utils/constants/Typografy';
const { markClassesMapping, variantMapping } = Typografy;

interface ExtraTypographyProps {
  marked?: 'center' | 'left' | 'none';
}

const CategoriesTypography = <C extends React.ElementType>(
  props: TypographyProps<C, { component?: C }> & ExtraTypographyProps) => {
  const { children, variant, marked = 'none', ...other } = props;

  let markedClassName = '';
  if (variant && variant in markClassesMapping[marked]) {
    markedClassName = markClassesMapping[marked][variant];
  }
  return (
    <MuiTypography variantMapping={variantMapping} variant={variant} {...other}>
      {children}
      {markedClassName ? <span className={markedClassName} /> : null}
    </MuiTypography>
  );
}

export default CategoriesTypography