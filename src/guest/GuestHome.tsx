import Typography from "../utils/Typography";

import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/img33.jpg";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useUserStore } from "../App";
import { useState } from "react";

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
      <div
        className="book-trip-details"
        style={{ display: "flex", justifyContent: "space-aeound" }}
      >
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="Where do you wanna go?"
            inputProps={{ "aria-label": "where do you wanna go" }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />
        </Paper>

        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: 400,
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
            sx={{ ml: 1, flex: 1 }}
            placeholder="Where do you wanna go?"
            inputProps={{ "aria-label": "where do you wanna go" }}
            onClick={handleCalendarToggle}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          />

          {isCalendarExpanded && (
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar />
              </LocalizationProvider>
            </div>
          )}
        </Paper>
      </div>

      {/* <Typography variant="body2" align="center" color="inherit" sx={{ mt: 6, fontSize:'20px', fontFamily: '"Oswald", sans-serif'}}>
        &try the experience
      </Typography> */}
    </ProductHeroLayout>
  );
};

export default GuestHome;
