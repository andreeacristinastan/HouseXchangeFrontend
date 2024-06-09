import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import { useFilterStore } from "../utils/useFilterStore";
import { ResponsePropertyInfoType } from "../utils/types/PropertyTypes";

type MyProps = {
  selectedProperty: ResponsePropertyInfoType | null;
  setSelectedProperty: (param: ResponsePropertyInfoType) => void;
  properties: ResponsePropertyInfoType[] | undefined;
  // setSelectedProperty: (param: ResponsePropertyInfoType) => void
};
export const SelectProperty: React.FC<MyProps> = ({
  // properties,
  setSelectedProperty,
  selectedProperty,

  properties,
}) => {
  // const classes = myStyle();
  // const MenuProps = {
  //   autoFocus: false,
  // };
  // const [numOfPers, setNumOfPers] = React.useState("");
  // const searchDetails = useFilterStore((state) => state.searchDetails);
  // const setSearchDetails = useFilterStore((state) => state.setSearchDetails);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setNumOfPers(event.target.value);
  //   // setNumberOfPersons(Number(numOfPers));
  // };

  // useEffect(() => {
  //   setNumberOfPersons(Number(numOfPers));
  // }, [numOfPers]);
  // const propertyName = properties?.map((p) => p.name);

  return (
    <FormControl>
      <Select
        // defaultValue={}
        // value={selectedProperty.name}

        value={selectedProperty}
        onChange={(e) => {
          setSelectedProperty(e.target.value as ResponsePropertyInfoType);
          // console.log(e.target.value);
        }}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{
          width: "100%",
          // height: "75px",
          outline: "none",
          color: "#588b97",
          fontSize: "20px",
          "&.Mui-focused": {
            color: "#588b97",
            outline: "none",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
          },
        }}
        MenuProps={{
          style: { maxHeight: 250, color: "#588b97" },
        }}
      >
        {properties?.map((val) => (
          <MenuItem key={val.id} value={val} sx={{ color: "#588b97" }}>
            {val.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectProperty;
