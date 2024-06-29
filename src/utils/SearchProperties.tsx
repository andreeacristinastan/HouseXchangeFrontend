import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TypeOfProperty from "../guest/utils/TypeOfProperty";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "react-google-autocomplete";
import dayjs, { Dayjs } from "dayjs";
import moment from "moment";
import { SearchValuesType } from "./types/SearchTypes";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { useSearch } from "./SearchContext";
import { useFilterStore } from "./useFilterStore";
import ApartmentIcon from "@mui/icons-material/Apartment";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { useApiIsLoaded, useMapsLibrary } from "@vis.gl/react-google-maps";

interface SearchPropertiesProps {
  textBtn?: boolean;
  onFormErr?: () => void;
  setNewPriceRange?: (value: []) => void;
  // handleChangeSearchDetails?: (name: string, value: string | number) => void;
}

const SearchProperties = ({
  textBtn: showTitle,
  onFormErr,
  setNewPriceRange,
}: SearchPropertiesProps) => {
  // props) {
  //   const { handleChangeLanguage } = props;
  //   const [language, setLanguage] = useState("");
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const places = useMapsLibrary("places");
  const filters = useFilterStore((state) => state.searchDetails);
  const setFilters = useFilterStore((state) => state.setSearchDetails);
  const resetFilters = useFilterStore((state) => state.resetSearchDetails);
  const err = useFilterStore((state) => state.error);
  const setErr = useFilterStore((state) => state.setError);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const handleClickButton = () => {
    if (
      onFormErr &&
      (filters.checkIn.length === 0 ||
        filters.checkOut.length === 0 ||
        filters.destination.length === 0)
    ) {
      onFormErr();
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);

      navigate("/properties/all");
    }, 3000);
  };

  const handleClickFiltersButton = () => {
    resetFilters();
    setNewPriceRange([]);
  };

  const handleCloseErr = () => {
    setErr("");
  };

  // const [priceRange, setpriceRange] = useState([]);

  return (
    <div
      className="book-trip-details"
      style={{
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* {showTitle && ( */}
        <div
          className="title-display"
          style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
        >
          Destination:
        </div>
        {/* )} */}
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 300,
            height: 70,
          }}
        >
          <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
            <SearchIcon />
          </IconButton>
          {places && (
            <Autocomplete
              key={filters.destination}
              defaultValue={filters.destination}
              apiKey={API_KEY}
              className="location-search"
              style={{
                ml: 1,
                flex: 1,
                color: "#588b97",
                height: "70px",
                border: "none",
                fontSize: "20px",
                outline: "none",
                fontFamily: '"Oswald", sans-serif',
              }}
              placeholder="Where do you wanna go?"
              onPlaceSelected={(place) => {
                if (place.formatted_address) {
                  setFilters("destination", place.formatted_address);
                  // setDestination(place.formatted_address);
                }
                console.log(place);
              }}
              options={{
                types: ["(regions)"],
              }}
              inputProps={{ "aria-label": "where do you wanna go" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          )}
        </Paper>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* {showTitle && ( */}
        <div
          className="title-display"
          style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
        >
          Check in:
        </div>
        {/* )} */}

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper
            defaultValue={filters.checkIn}
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="search">
              <CalendarMonthOutlinedIcon />
            </IconButton>

            <MobileDatePicker
              key={filters.checkIn}
              format="DD-MM-YYYY"
              defaultValue={dayjs(filters.checkIn, "DD-MM-YYYY")}
              onChange={(date) => {
                console.log(typeof date);
                if (date) {
                  setFilters("checkIn", date.format("DD/MM/YYYY"));

                  // if(err.length !== 0) {

                  // }
                  // setCheckInDate(date?.format("DD/MM/YYYY"));
                }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  border: "1px solid #fff",
                  color: "#588b97",
                },
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #fff",
                  },
                  padding: 0,
                  backgroundColor: "white",
                  height: 74,
                  width: 125,

                  "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #fff",
                    },
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #fff",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#588b97",
                },
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": {
                    borderColor: "white!important",
                  },
                  "&:hover fieldset": {
                    borderColor: "white!important",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white !important",
                  },
                },
              }}
            />
          </Paper>
        </LocalizationProvider>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* {showTitle && ( */}
        <div
          className="title-display"
          style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
        >
          Check out:
        </div>
        {/* )} */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Paper
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="search">
              <CalendarMonthOutlinedIcon />
            </IconButton>

            <MobileDatePicker
              key={filters.checkOut}
              format="DD-MM-YYYY"
              defaultValue={dayjs(filters.checkOut, "DD-MM-YYYY")}
              onChange={(date) => {
                console.log(date?.format("DD-MM-YYYY"));
                if (date) {
                  setFilters("checkOut", date.format("DD/MM/YYYY"));
                }
              }}
              sx={{
                "& .MuiInputLabel-root": {
                  border: "1px solid #fff",
                  color: "#588b97",
                },
                "& .MuiInputBase-root": {
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #fff",
                  },
                  padding: 0,
                  backgroundColor: "white",
                  height: 74,
                  width: 125,

                  "&:hover": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #fff",
                    },
                  },
                  "&.Mui-focused": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      border: "1px solid #fff",
                    },
                  },
                },
                "& .MuiInputBase-input": {
                  color: "#588b97",
                },
                "& .MuiOutlinedInput-root": {
                  border: "none",
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
              }}
            />
          </Paper>
        </LocalizationProvider>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* {showTitle && ( */}
        <div
          className="title-display"
          style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
        >
          Type of property:
        </div>
        {/* )} */}
        <Paper
          defaultValue={filters.typeOfProperty}
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="search">
            <ApartmentIcon sx={{ fontSize: "30px", color: "#757575" }} />
          </IconButton>
          <TypeOfProperty
            setTypeOfProperty={(val) => setFilters("typeOfProperty", val)}
          />
        </Paper>
      </div>

      {showTitle ? (
        <input
          type="submit"
          value="Search"
          onClick={handleClickButton}
          className="search-trip-btn"
          style={{ width: "100px", borderRadius: "48px" }}
        />
      ) : (
        <input
          type="submit"
          value="Remove Filters"
          onClick={handleClickFiltersButton}
          className="remove-filter-btn"
          style={{
            // alignItems: "center",
            width: "150px",
            borderRadius: "70px",
            background: "#588b97",
            boxShadow: "20px 12px 15px 2px rgba(0, 0, 0, 0.4)",
          }}
        />
      )}

      <Dialog open={err.length !== 0} onClose={() => handleCloseErr()}>
        <DialogTitle color={"#f58989"}>{"Warning! 🥺"}</DialogTitle>
        <DialogContent>
          <DialogContentText>{err}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseErr()}>Ok</Button>
        </DialogActions>
      </Dialog>

      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
          }}
        >
          <div>
            <CircularProgress style={{ color: "#fff" }} />{" "}
            {/* This is your loading icon */}
            <p
              style={{
                color: "#fff",
                width: "auto",
                fontSize: "50px",
                textShadow: "12px 12px 15px #588b97",
              }}
            >
              We'll find the best accommodations for you...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProperties;
