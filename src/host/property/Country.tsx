/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import {
  Select as BaseSelect,
  selectClasses,
  SelectListboxSlotProps,
  SelectProps,
  SelectRootSlotProps,
} from "@mui/base/Select";
import { Option as BaseOption, optionClasses } from "@mui/base/Option";
import { styled } from "@mui/system";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
// import { languages } from "../../utils/constants/Languages";
import { useEffect, useState } from "react";

type CountryApi = {
  name: {
    common: string;
  };
};

export default function Country(props) {
  const { handleSelectCountry } = props;
  const [countries, setCountries] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const handleSelectChange = (event) => {
    // parentFunc(language);
    // console.log(event.target.textContent);
    setSelectedCountry(event.target.textContent);
  };

  useEffect(() => {
    handleSelectCountry(selectedCountry);
  }, [selectedCountry]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: CountryApi[]) =>
        setCountries(data.map((d) => d.name.common).sort())
      )
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <Select onChange={handleSelectChange}>
      {countries.map((c) => (
        <Option key={c} value={c}>
          {c}
        </Option>
      ))}
    </Select>
  );
}

const Select = React.forwardRef(function CustomSelect<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const slots = {
    root: StyledButton,
    listbox: AnimatedListbox,
    popup: Popup,
    ...props.slots,
  };

  return <BaseSelect {...props} ref={ref} slots={slots} />;
});

const blue = {
  100: "#DAECFF",
  200: "#588b97",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
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
  900: "#1C2025",
};

const Button = React.forwardRef(function Button<
  TValue extends {},
  Multiple extends boolean
>(
  props: SelectRootSlotProps<TValue, Multiple>,
  ref: React.ForwardedRef<HTMLButtonElement>
) {
  const { ownerState, ...other } = props;
  return (
    <button type="button" {...other} ref={ref}>
      {other.children}
      <UnfoldMoreRoundedIcon />
    </button>
  );
});

const StyledButton = styled(Button, { shouldForwardProp: () => true })(
  ({ theme }) => `
  font-family: "Oswald", sans-serif;
  font-size: 20px;
  color: #588b97;
  box-sizing: border-box;
  width:250px;
  min-width: 150px;
  padding: 8px 12px;
  border-radius: 8px;
  text-align: center;
  line-height: 1.5;
  position: relative;
  background: #fff;
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;

  &.${selectClasses.focusVisible} {
    outline: 0;
    border-color: ${blue[400]};
    box-shadow: 0 0 0 3px ${theme.palette.mode === blue[200]};
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
  margin: 12px 0;
  width:170px;
  max-height: 155px;
  border-radius: 12px;
  overflow: auto;
  outline: 0px;
  background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  color: #588b97;
  
  
  .closed & {
    opacity: 0;
    transform: scale(0.95, 0.8);
    transition: opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scale(1, 1);
    transition: opacity 100ms ease-out, transform 100ms cubic-bezier(0.43, 0.29, 0.37, 1.48);
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox<
  Value extends {},
  Multiple extends boolean
>(
  props: SelectListboxSlotProps<Value, Multiple>,
  ref: React.ForwardedRef<HTMLUListElement>
) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

const Option = styled(BaseOption)(
  ({}) => `
  list-style: none;
  padding: 8px;
  border-radius: 8px;
  cursor: default;

  &:last-of-type {
    border-bottom: none;
  }

  &.${optionClasses.selected} {
    background-color: #588b97;
    color: #588b97;
  }

  &:focus-visible {
    outline: 3px solid #588b97;
  }
  
  &.${optionClasses.highlighted}.${optionClasses.selected} {
    background-color: #588b97;
    color: #fff;
  }

 

  &:hover:not(.${optionClasses.disabled}) {
    background-color: #bad7db;
    color: #588b97;
  }
  `
);

const Popup = styled("div")`
  z-index: 1;
`;
