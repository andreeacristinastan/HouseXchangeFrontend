import React from "react";
import Slider, {
  SliderThumb,
  SliderValueLabelProps,
} from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";

const AirbnbSlider = styled(Slider)(({ theme }) => ({
  color: "#255f6c",
  height: 3,
  padding: "13px 0",

  "& .MuiSlider-thumb": {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(58, 133, 137, 0.16)",
    },
    "& .airbnb-bar": {
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  "& .MuiSlider-track": {
    height: 6,
  },
  "& .MuiSlider-rail": {
    color: theme.palette.mode === "dark" ? "#fff" : "#fff",
    opacity: theme.palette.mode === "dark" ? undefined : 1,
    height: 10,
    border: "2px solid #87a9b0 !important",
    boxShadow: "5px 5px 5px #333737 ",
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    color: "#588b97",
    backgroundColor: "#fff",
    transformOrigin: "bottom left",
    border: "2px solid #87a9b0 !important",
    boxShadow: "5px 5px 2px #fff3 ",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&::before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
}));

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

const PriceRangeSlider = () => {
  return (
    <Box
      sx={{
        width: 400,
        ml: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        className="title-display"
        style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
      >
        Price range (RON):
      </div>
      <AirbnbSlider
        valueLabelDisplay="auto"
        slots={{ thumb: AirbnbThumbComponent }}
        getAriaLabel={(index) =>
          index === 0 ? "Minimum price" : "Maximum price"
        }
        defaultValue={[500, 1000]}
        min={100}
        max={1500}
      />
    </Box>
  );
};

export default PriceRangeSlider;
