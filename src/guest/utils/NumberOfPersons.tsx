/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  Select as BaseSelect,
  SelectProps,
  selectClasses,
  SelectRootSlotProps,
} from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";

export default function NumberOfPersons() {
  const numOfpersons = Array.from({ length: 15 }, (_, index) => index + 1);
  return (
    <Select defaultValue={1} id="named-select" name="demo-select">
      {numOfpersons.map((num) => (
        <Option key={num} value={num}>
          {num}
        </Option>
      ))}
    </Select>
  );
}

const Select = React.forwardRef(function CustomSelect<
  TValue extends NonNullable<unknown>,
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots: SelectProps<TValue, Multiple>["slots"] = {
    root: Button,
    listbox: Listbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
}) as <TValue extends NonNullable<unknown>, Multiple extends boolean>(
  props: SelectProps<TValue, Multiple> & React.RefAttributes<HTMLButtonElement>
) => JSX.Element;

const blue = {
  100: "#DAECFF",
  200: "#99CCF3",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#588b97",
};

const Button = React.forwardRef(function Button<
  TValue extends NonNullable<unknown>,
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <StyledButton type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </StyledButton>
  );
});

const StyledButton = styled("button", { shouldForwardProp: () => true })(
  ({ theme }) => `
  position: relative;
  font-family: 'Oswald', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-width: 150px;
  padding: 6px 6px;
  border-radius: 8px;
  text-align: left;
  line-height: 1.5;
  font-size: 18px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: #588b97;
  

  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    
  }

  & > svg {
    font-size: 1rem;
    position: absolute;
    height: 100%;
    top: 0;
    right: 10px;
  }
  `
);

const Listbox = styled("ul")(
  ({ theme }) => `
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  padding: 6px;
  margin: 25px 0;
  min-width: 150px;
  max-height: 150px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: #588b97;
  
  `
);

const Option = styled(BaseOption)(
  ({ theme }) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;
  color: #588b97;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #588b97;
    color: #588b97;
  }

  &.${optionClasses.highlighted} {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color:#588b97;
  }

  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color:#588b97;
    color: #FFF;
  }

  &:focus-visible {
    outline: 3px solid ${theme.palette.mode === "dark" ? blue[600] : blue[200]};
  }

  &.${optionClasses.disabled} {
    color: #588b97;
  }

  &:hover:not(.${optionClasses.disabled}) {
    background-color: ${theme.palette.mode === "dark" ? grey[800] : grey[100]};
    color: #588b97;
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;
