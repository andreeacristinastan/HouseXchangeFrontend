import React from "react";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NumberOfPersons from "../guest/utils/NumberOfPersons";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Autocomplete from "react-google-autocomplete";

const SearchProperties = ({ showTitle }: { showTitle: boolean }) => {
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;
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
        {showTitle && (
          <div
            className="title-display"
            style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
          >
            Destination:
          </div>
        )}
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

          <Autocomplete
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
        </Paper>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {showTitle && (
          <div
            className="title-display"
            style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
          >
            Check in:
          </div>
        )}
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
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#588b97",
                },
                "& .MuiInputBase-root": {
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
        {showTitle && (
          <div
            className="title-display"
            style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
          >
            Check out:
          </div>
        )}
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
              sx={{
                "& .MuiInputLabel-root": {
                  color: "#588b97",
                },
                "& .MuiInputBase-root": {
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
        {showTitle && (
          <div
            className="title-display"
            style={{ color: "#fff", fontFamily: '"Oswald", sans-serif' }}
          >
            Number of persons:
          </div>
        )}
        <Paper
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton aria-label="search">
            <PersonOutlineOutlinedIcon />
          </IconButton>
          <NumberOfPersons />
        </Paper>
      </div>
      <input
        type="submit"
        value="Search"
        className="login-btn"
        style={{ width: "100px", borderRadius: "48px" }}
      />
    </div>
  );
};

export default SearchProperties;
