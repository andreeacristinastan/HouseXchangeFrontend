import clsx from 'clsx';
import MuiTextField, {
  FilledTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material/TextField';

const inputStyleMappingClasses = {
    small: 'OnePirateTextField-inputSizeSmall',
    medium: 'OnePirateTextField-inputSizeMedium',
    large: 'OnePirateTextField-inputSizeLarge',
    xlarge: 'OnePirateTextField-inputSizeXLarge',
  };
  
  const classes = {
    root: 'OnePirateTextField-root',
    input: 'OnePirateTextField-input',
    inputBorder: 'OnePirateTextField-inputBorder',
  };

  export interface OnePirateTextFieldProps
  extends Omit<FilledTextFieldProps | StandardTextFieldProps, 'size'> {
  noBorder?: boolean;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
}

const TextField = (props: OnePirateTextFieldProps) => {
    const {
        InputProps = {},
        InputLabelProps,
        noBorder,
        size = 'medium',
        SelectProps,
        ...other
      } = props;
    
      const {
        classes: { input: InputPropsClassesInput, ...InputPropsClassesOther } = {},
        ...InputPropsOther
      } = InputProps;
  return (
    <MuiTextField
      InputProps={{
        classes: {
          root: classes.root,
          input: clsx(
            classes.input,
            inputStyleMappingClasses[size],
            {
              [classes.inputBorder]: !noBorder,
            },
            InputPropsClassesInput,
          ),
          ...InputPropsClassesOther,
        },
        disableUnderline: true,
        ...InputPropsOther,
      }}
      InputLabelProps={{
        ...InputLabelProps,
        shrink: true,
      }}
      SelectProps={SelectProps}
      {...other}
    />
  );
}

export default TextField