import React from "react";
import ProductHeroLayout from "../home/components/GettingStartedLay";
import backgroundImage from "../utils/images/pexels-curtis-adams-1694007-5071140.jpg";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useUserStore } from "../utils/useUserStore";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import { Box, Link } from "@mui/material";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import Autocomplete from "react-google-autocomplete";
import Typography from "../utils/Typography";

const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

const HostHome = () => {
  const { user, setUser } = useUserStore();

  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;
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
        Start adding your properties
      </Typography>
      <Link
        variant="h6"
        underline="none"
        href="/property/create"
        className="create-acc-btn"
        sx={{
          ...rightLink,
          fontSize: 25,
          border: "1px solid white",
          padding: "10px 15px",
          display: "inline-block",
          fontFamily: '"Oswald", sans-serif',
          textAlign: "center",
          transition: "background-color 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {"Add a property"}
      </Link>
    </ProductHeroLayout>
  );
};

export default HostHome;
