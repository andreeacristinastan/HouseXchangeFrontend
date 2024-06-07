import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/system";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useEffect } from "react";
import { useFilterStore } from "../../utils/useFilterStore";

export default function SelectLabels({
  setTypeOfProperty,
}: {
  setTypeOfProperty: (num: string) => void;
}) {
  // const classes = myStyle();
  // const MenuProps = {
  //   autoFocus: false,
  // };
  const [numOfPers, setNumOfPers] = React.useState("");
  const searchDetails = useFilterStore((state) => state.searchDetails);
  const setSearchDetails = useFilterStore((state) => state.setSearchDetails);

  // const handleChange = (event: SelectChangeEvent) => {
  //   setNumOfPers(event.target.value);
  //   // setNumberOfPersons(Number(numOfPers));
  // };

  // useEffect(() => {
  //   setNumberOfPersons(Number(numOfPers));
  // }, [numOfPers]);

  const typeOfProperty = ["Villa", "House", "Apartment"];

  return (
    <div>
      <FormControl sx={{ minWidth: 120 }}>
        <Select
          defaultValue={"1"}
          value={searchDetails.typeOfProperty.toString()}
          onChange={(e) => setSearchDetails("typeOfProperty", e.target.value)}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            width: "130px",
            height: "75px",
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
          {typeOfProperty.map((val) => (
            <MenuItem key={val} value={val} sx={{ color: "#588b97" }}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
