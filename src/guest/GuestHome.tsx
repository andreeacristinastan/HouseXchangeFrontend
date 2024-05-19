import Typography from "../utils/Typography";

import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/img33.jpg";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useUserStore } from "../App";
import { useEffect, useState } from "react";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, TextField } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import "./GuestHome.css";
import GoogleMapsAutocomplete from "./utils/GoogleMapsAutocomplete";
import Autocomplete from "react-google-autocomplete";
import { Field } from "formik";
import NumberOfPersons from "./utils/NumberOfPersons";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const GuestHome = () => {
  const { user, setUser } = useUserStore();
  const [isCalendarExpanded, setCalendarExpanded] = useState(false);

  const handleCalendarToggle = () => {
    setCalendarExpanded(!isCalendarExpanded);
  };
  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  // useEffect(() => {
  //   console.log(API_KEY);
  // }, []);

  return (
    <ProductHeroLayout
      className="start-container"
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      ></link>
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        marked="center"
        sx={{ fontFamily: '"Oswald", sans-serif' }}
      >
        Welcome back, {user?.username}!
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h5"
        sx={{
          mb: 4,
          mt: { xs: 4 },
          fontFamily: '"Oswald", sans-serif',
        }}
      >
        Start booking your first trip
      </Typography>
      <Box
        sx={{
          width: "950px",
          height: "150px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3))",
        }}
      >
        <div
          className="book-trip-details"
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
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
            {/* <IconButton sx={{ p: "10px" }} aria-label="menu">
          <MenuIcon />
        </IconButton> */}
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <InputBase
              sx={{
                ml: 1,
                flex: 1,
                color: "#588b97",
              }}
              placeholder="Where do you wanna go?"
              inputProps={{ "aria-label": "where do you wanna go" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </Paper>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
              sx={{
                // p: "2px 4px",

                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="search">
                <CalendarMonthOutlinedIcon />
              </IconButton>

              <MobileDatePicker
                // label="Check In"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#588b97", // Set label color to white
                  },
                  "& .MuiInputBase-root": {
                    // border: "none",
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Paper
              sx={{
                // p: "2px 4px",

                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton aria-label="search">
                <CalendarMonthOutlinedIcon />
              </IconButton>

              <MobileDatePicker
                // label="Check In"
                sx={{
                  "& .MuiInputLabel-root": {
                    color: "#588b97", // Set label color to white
                  },
                  "& .MuiInputBase-root": {
                    // border: "none",
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
          <Paper
            sx={{
              // p: "2px 4px",

              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton aria-label="search">
              <PersonOutlineOutlinedIcon />
            </IconButton>
            <NumberOfPersons />
          </Paper>
          <input
            type="submit"
            value="Search"
            className="login-btn"
            style={{ width: "80px", borderRadius: "48px" }}
          />
        </div>
      </Box>
      <Autocomplete
        apiKey={API_KEY}
        onPlaceSelected={(place) => console.log(place)}
      />
    </ProductHeroLayout>
  );
};

export default GuestHome;
