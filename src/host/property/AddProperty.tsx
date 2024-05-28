import React, { useEffect, useState } from "react";
import backgroundImage from "../../utils/images/stacked-waves-haikei2.png";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HouseIcon from "@mui/icons-material/House";
import VillaIcon from "@mui/icons-material/Villa";
import "./AddProperty.css";
import Autocomplete from "react-google-autocomplete";
import BedIcon from "@mui/icons-material/Bed";
import { getCode } from "country-list";
import BathtubIcon from "@mui/icons-material/Bathtub";
import PetsIcon from "@mui/icons-material/Pets";
import AccessibleIcon from "@mui/icons-material/Accessible";
import Country from "./Country";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import DeckIcon from "@mui/icons-material/Deck";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import WifiIcon from "@mui/icons-material/Wifi";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BalconyIcon from "@mui/icons-material/Balcony";

const MainComponent = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  [theme.breakpoints.up("sm")]: {
    height: "130vh",
  },
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  //   backgroundAttachment: "fixed",
}));

const AddProperty = () => {
  const [activeButton, setActiveButton] = useState("false");
  const [activeRoomButton, setActiveRoomButton] = useState("false");
  const [activeBathButton, setActiveBathButton] = useState("false");
  const [activePetButton, setActivePetButton] = useState("false");
  const [activeDisabilityButton, setActiveDisabilityButton] = useState("false");
  const [activePoolButton, setActivePoolButton] = useState("false");
  const [activeGardenButton, setActiveGardenButton] = useState("false");
  const [activeParkingButton, setActiveParkingButton] = useState("false");
  const [activeGymButton, setActiveGymButton] = useState("false");
  const [activeWifiButton, setActiveWifiButton] = useState("false");
  const [activeBikesButton, setActiveBikesButton] = useState("false");
  const [activeKidsButton, setActiveKidsButton] = useState("false");
  const [activeBreakfastButton, setActiveBreakfastButton] = useState("false");
  const [activeLunchButton, setActiveLunchButton] = useState("false");
  const [activeDinnerButton, setActiveDinnerButton] = useState("false");
  const [activeTowelsButton, setActiveTowelsButton] = useState("false");
  const [activeBalconyButton, setActiveBalconyButton] = useState("false");
  const [activeAcButton, setActiveAcButton] = useState("false");
  const [activeTvButton, setActiveTvButton] = useState("false");
  const [selectedCountry, setSelectedCountry] = useState("");

  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const handleSelectCountry = (selectedCountry: string) => {
    setSelectedCountry(selectedCountry);
    // console.log(selectedCountry);
  };
  const countryCode = getCode(selectedCountry);
  const restriction = "" + countryCode?.toString().toLowerCase();
  //   console.log(countryCode?.toString().toLowerCase());

  //   const handleChange = (event: SelectChangeEvent) => {
  //     setSelectedCountry(event.target.value);
  //   };

  const styleBtn = (buttonType: string) => ({
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "120px",
    height: "120px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeButton === buttonType ? "0 0 5px" : "0 0 3px",

    background:
      activeButton === buttonType ? "rgba(255, 255, 255, 0.1)" : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(activeButton === buttonType ? "false" : buttonType);
  };
  const styleBreakfastBtn = (buttonType: string) => ({
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "120px",
    height: "120px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeBreakfastButton === buttonType ? "0 0 5px" : "0 0 3px",

    background:
      activeBreakfastButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleBreakfastButtonClick = (buttonType: string) => {
    setActiveBreakfastButton(
      activeBreakfastButton === buttonType ? "false" : buttonType
    );
  };

  const styleLunchBtn = (buttonType: string) => ({
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "120px",
    height: "120px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeLunchButton === buttonType ? "0 0 5px" : "0 0 3px",

    background:
      activeLunchButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleLunchButtonClick = (buttonType: string) => {
    setActiveLunchButton(
      activeLunchButton === buttonType ? "false" : buttonType
    );
  };
  const styleDinnerBtn = (buttonType: string) => ({
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    width: "120px",
    height: "120px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeDinnerButton === buttonType ? "0 0 5px" : "0 0 3px",

    background:
      activeDinnerButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleDinnerButtonClick = (buttonType: string) => {
    setActiveDinnerButton(
      activeDinnerButton === buttonType ? "false" : buttonType
    );
  };

  const styleRoomBtn = (buttonType: string) => ({
    fontSize: "25px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeRoomButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeRoomButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleRoomButtonClick = (buttonType: string) => {
    setActiveRoomButton(activeRoomButton === buttonType ? "false" : buttonType);
  };

  const styleBathBtn = (buttonType: string) => ({
    fontSize: "25px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeBathButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeBathButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleBathButtonClick = (buttonType: string) => {
    setActiveBathButton(activeBathButton === buttonType ? "false" : buttonType);
  };

  const stylePetBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activePetButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activePetButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handlePetButtonClick = (buttonType: string) => {
    setActivePetButton(activePetButton === buttonType ? "false" : buttonType);
  };

  const styleDisabilityBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeDisabilityButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeDisabilityButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleDisabilityButtonClick = (buttonType: string) => {
    setActiveDisabilityButton(
      activeDisabilityButton === buttonType ? "false" : buttonType
    );
  };
  const stylePoolBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activePoolButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activePoolButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handlePoolButtonClick = (buttonType: string) => {
    setActivePoolButton(activePoolButton === buttonType ? "false" : buttonType);
  };
  const styleGardenBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeGardenButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeGardenButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleGardenButtonClick = (buttonType: string) => {
    setActiveGardenButton(
      activeGardenButton === buttonType ? "false" : buttonType
    );
  };
  const styleParkingBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeParkingButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeParkingButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleParkingButtonClick = (buttonType: string) => {
    setActiveParkingButton(
      activeParkingButton === buttonType ? "false" : buttonType
    );
  };
  const styleGymBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeGymButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeGymButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleGymButtonClick = (buttonType: string) => {
    setActiveGymButton(activeGymButton === buttonType ? "false" : buttonType);
  };
  const styleWifiBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeWifiButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeWifiButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleWifiButtonClick = (buttonType: string) => {
    setActiveWifiButton(activeWifiButton === buttonType ? "false" : buttonType);
  };
  const styleBikesBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeBikesButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeBikesButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleBikesButtonClick = (buttonType: string) => {
    setActiveBikesButton(
      activeBikesButton === buttonType ? "false" : buttonType
    );
  };
  const styleKidsBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeKidsButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeKidsButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleKidsButtonClick = (buttonType: string) => {
    setActiveKidsButton(activeKidsButton === buttonType ? "false" : buttonType);
  };

  const styleAcBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeAcButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeAcButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleAcButtonClick = (buttonType: string) => {
    setActiveAcButton(activeAcButton === buttonType ? "false" : buttonType);
  };

  const styleTowelsBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeTowelsButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeTowelsButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleTowelsButtonClick = (buttonType: string) => {
    setActiveTowelsButton(
      activeTowelsButton === buttonType ? "false" : buttonType
    );
  };

  const styleTvBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeTvButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeTvButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleTvButtonClick = (buttonType: string) => {
    setActiveTvButton(activeTvButton === buttonType ? "false" : buttonType);
  };

  const styleBalconyBtn = (buttonType: string) => ({
    fontSize: "15px",
    color: "#fff",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "auto",
    height: "50px",
    marginLeft: "290px",
    fontFamily: '"Oswald", sans-serif',
    boxShadow: activeBalconyButton === buttonType ? "0 0 5px" : "0 0 2px",

    background:
      activeBalconyButton === buttonType
        ? "rgba(255, 255, 255, 0.1)"
        : "transparent",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
    },
  });

  const handleBalconyButtonClick = (buttonType: string) => {
    setActiveBalconyButton(
      activeBalconyButton === buttonType ? "false" : buttonType
    );
  };

  return (
    <MainComponent>
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />
      <div
        style={{
          marginLeft: "20px",
          marginTop: "90px",
          maxWidth: "50%",
          //   maxHeight: "50%",
        }}
      >
        <div className="title">Property Type:</div>
        <Stack spacing={7} direction="row">
          <Button
            variant="outlined"
            onClick={() => handleButtonClick("apartment")}
            sx={styleBtn("apartment")}
          >
            <ApartmentIcon sx={{ fontSize: "50px" }} />
            Apartment
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleButtonClick("house")}
            sx={styleBtn("house")}
          >
            <HouseIcon sx={{ fontSize: "50px" }} />
            House
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleButtonClick("villa")}
            sx={styleBtn("villa")}
          >
            <VillaIcon sx={{ fontSize: "50px" }} />
            Villa
          </Button>
        </Stack>

        <div className="name-component">
          <div className="title">Property Name</div>
          <input
            className="input-name"
            placeholder="Write your property name"
          />
        </div>
        <div className="adress-component">
          <div className="title">Property Adress</div>
          <input
            className="input-adress"
            placeholder="Write your property adress"
          />
        </div>

        <div className="adress-details-component">
          <div className="country-component">
            <div className="title">Country</div>
            <Country handleSelectCountry={handleSelectCountry} />
          </div>

          <div className="zip-code-component">
            <div className="title">Zip Code</div>
            <input className="input-zip-code" />
          </div>

          <div className="city-component">
            <div className="title">City</div>

            <Autocomplete
              apiKey={API_KEY}
              className="input-city"
              placeholder="Select city"
              onPlaceSelected={(place) => {
                console.log(place);
              }}
              options={{
                types: ["(regions)"],
                componentRestrictions: { country: restriction },
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>

        <div className="room-component">
          <div className="title">Number of rooms:</div>
          <Stack spacing={7} direction="row">
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("1")}
              sx={styleRoomBtn("1")}
            >
              1
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("2")}
              sx={styleRoomBtn("2")}
            >
              2
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("3")}
              sx={styleRoomBtn("3")}
            >
              3
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("4")}
              sx={styleRoomBtn("4")}
            >
              4
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("5")}
              sx={styleRoomBtn("5")}
            >
              5
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("6")}
              sx={styleRoomBtn("6")}
            >
              +6
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
          </Stack>
        </div>

        <div className="bathroom-component">
          <div className="title">Number of bathrooms:</div>
          <Stack spacing={7} direction="row">
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("1")}
              sx={styleBathBtn("1")}
            >
              1
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("2")}
              sx={styleBathBtn("2")}
            >
              2
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("3")}
              sx={styleBathBtn("3")}
            >
              3
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("4")}
              sx={styleBathBtn("4")}
            >
              4
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("5")}
              sx={styleBathBtn("5")}
            >
              5
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("6")}
              sx={styleBathBtn("6")}
            >
              +6
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
          </Stack>
        </div>

        <div className="amenities-component">
          <div className="title">Amenities:</div>
          <Stack spacing={5} direction="row">
            <Button
              variant="outlined"
              onClick={() => handlePetButtonClick("pet")}
              sx={stylePetBtn("pet")}
            >
              <PetsIcon sx={{ fontSize: "30px" }} />
              Pet Friendly
            </Button>

            <Button
              variant="outlined"
              onClick={() => handleDisabilityButtonClick("disability")}
              sx={styleDisabilityBtn("disability")}
            >
              <AccessibleIcon sx={{ fontSize: "40px" }} />
              Disabilities Friendly
            </Button>

            <Button
              variant="outlined"
              onClick={() => handlePoolButtonClick("pool")}
              sx={stylePoolBtn("pool")}
            >
              <PoolIcon sx={{ fontSize: "40px" }} />
              Swimming Pool
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleGardenButtonClick("garden")}
              sx={styleGardenBtn("garden")}
            >
              <DeckIcon sx={{ fontSize: "40px" }} />
              Garden
            </Button>
          </Stack>

          <Stack spacing={7} direction="row" sx={{ mt: "20px" }}>
            <Button
              variant="outlined"
              onClick={() => handleParkingButtonClick("parking")}
              sx={styleParkingBtn("parking")}
            >
              <DirectionsCarIcon sx={{ fontSize: "40px" }} />
              Parking
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleGymButtonClick("gym")}
              sx={styleGymBtn("gym")}
            >
              <FitnessCenterIcon sx={{ fontSize: "40px" }} />
              Gym
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleWifiButtonClick("wifi")}
              sx={styleWifiBtn("wifi")}
            >
              <WifiIcon sx={{ fontSize: "35px" }} />
              Wi-fi
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBikesButtonClick("bikes")}
              sx={styleBikesBtn("bikes")}
            >
              <DirectionsBikeIcon sx={{ fontSize: "40px" }} />
              Bikes
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleKidsButtonClick("kids")}
              sx={styleKidsBtn("kids")}
            >
              <ChildCareIcon sx={{ fontSize: "40px" }} />
              Kids Zone
            </Button>
          </Stack>
        </div>
      </div>

      <div
        className="right-side-component"
        style={{
          marginRight: "20px",
          marginTop: "90px",
          maxWidth: "50%",
          //   maxHeight: "50%",
        }}
      >
        <div className="meal-component">
          <div className="title">Meals:</div>
          <Stack spacing={7} direction="row">
            <Button
              variant="outlined"
              onClick={() => handleBreakfastButtonClick("breakfast")}
              sx={styleBreakfastBtn("breakfast")}
            >
              <BakeryDiningIcon sx={{ fontSize: "50px" }} />
              Breakfast
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleLunchButtonClick("lunch")}
              sx={styleLunchBtn("lunch")}
            >
              <RamenDiningIcon sx={{ fontSize: "50px" }} />
              Lunch
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleDinnerButtonClick("dinner")}
              sx={styleDinnerBtn("dinner")}
            >
              <LunchDiningIcon sx={{ fontSize: "50px" }} />
              Dinner
            </Button>
          </Stack>
        </div>

        <div className="description-component">
          <div className="title">Property description:</div>
          <textarea
            className="input-description"
            placeholder="Write your property description"
          />
        </div>

        <div className="facilities-component">
          <div className="title">Facilities:</div>
          <Stack spacing={5} direction="row" sx={{ mt: "20px" }}>
            <Button
              variant="outlined"
              onClick={() => handleTowelsButtonClick("towels")}
              sx={styleTowelsBtn("towels")}
            >
              <DryCleaningIcon sx={{ fontSize: "40px" }} />
              Towels
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBalconyButtonClick("balcony")}
              sx={styleBalconyBtn("balcony")}
            >
              <BalconyIcon sx={{ fontSize: "35px" }} />
              Balcony
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleAcButtonClick("airconditioning")}
              sx={styleAcBtn("airconditioning")}
            >
              <AcUnitIcon sx={{ fontSize: "40px" }} />
              Air conditioning
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleTvButtonClick("tv")}
              sx={styleTvBtn("tv")}
            >
              <TvIcon sx={{ fontSize: "40px" }} />
              TV
            </Button>
          </Stack>
        </div>

        {/* <div className="price-component">
          <div className="title">Price:</div>
          <input className="input-price" />
        </div> */}
        <input
          type="property"
          value="Create property"
          className="add-property-btn"
        />
      </div>
    </MainComponent>
  );
};

export default AddProperty;
