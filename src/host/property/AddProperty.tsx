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
import { useUserStore } from "../../utils/useUserStore";
import CheckIcon from "@mui/icons-material/Check";

import LinearProgress from "@mui/material/LinearProgress";
import {
  styleBtn,
  styleRoomBtn,
  styleBathBtn,
  styleAmenityBtn,
  styleMealBtn,
} from "./ButtonsStyle";
import AuthService from "../../services/AuthService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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

type createProperty = {
  name: string;
  country: string;
  city: string;
  address: string;
  zipCode: number;
  propertyDescription: string;
  propertyType: string;
  numberOfBathrooms: number;
  numberOfRooms: number;
  price: number;
  userId: number | undefined;

  facilities: createFacility;
  amenities: createAmenity;
  meals: createMeal;
};

type createFacility = {
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  // propertyId: number;
};

type createAmenity = {
  gym: boolean;
  swimmingPool: boolean;
  garden: boolean;
  parking: boolean;
  wifi: boolean;
  bikes: boolean;
  kidsZone: boolean;
  petsFriendly: boolean;
  disabilitiesFriendly: boolean;
  // propertyId: number;
};

type createMeal = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  // propertyId: number;
};

const AddProperty = () => {
  const [activeButton, setActiveButton] = useState("false");
  const [activeRoomButton, setActiveRoomButton] = useState("false");
  const [activeBathButton, setActiveBathButton] = useState("false");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [amenities, setAmenities] = useState<createAmenity>({
    petsFriendly: false,
    disabilitiesFriendly: false,
    swimmingPool: false,
    garden: false,
    parking: false,
    gym: false,
    wifi: false,
    bikes: false,
    kidsZone: false,
  });

  const [meals, setMeals] = useState<createMeal>({
    breakfast: false,
    lunch: false,
    dinner: false,
  });

  const [facilities, setFacilities] = useState<createFacility>({
    towel: false,
    balcony: false,
    airConditioning: false,
    tv: false,
  });
  const { user, setUser } = useUserStore();

  const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

  const handleSelectCountry = (selectedCountry: string) => {
    setSelectedCountry(selectedCountry);
    // console.log(selectedCountry);
  };
  const countryCode = getCode(selectedCountry);
  const restriction = "" + countryCode?.toString().toLowerCase();

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(activeButton === buttonType ? "false" : buttonType);
  };

  const handleRoomButtonClick = (buttonType: string) => {
    setActiveRoomButton(activeRoomButton === buttonType ? "false" : buttonType);
  };

  const handleBathButtonClick = (buttonType: string) => {
    setActiveBathButton(activeBathButton === buttonType ? "false" : buttonType);
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const [propertyInputInfos, setPropertyInputInfos] = useState({
    name: "",
    city: "",
    address: "",
    zipCode: 0,
    propertyDescription: "",
  });

  const handleInfosChange = (event: {
    target: { value: string; name?: any };
  }) => {
    const { name, value } = event.target;
    setPropertyInputInfos({ ...propertyInputInfos, [name]: value });
  };

  const isFilled = () => {
    const nameIsFilled = propertyInputInfos.name.length !== 0;
    const addressIsFilled = propertyInputInfos.address.length !== 0;
    const countryIsFilled = selectedCountry.length !== 0;
    const zipCodeIsFilled = propertyInputInfos.zipCode !== 0;
    const numberOfBathroomsIsFilled = activeBathButton !== "false";
    const numberOfRoomsIsFilled = activeRoomButton !== "false";
    const descriptionIsFilled =
      propertyInputInfos.propertyDescription.length !== 0;

    return (
      nameIsFilled &&
      addressIsFilled &&
      countryIsFilled &&
      zipCodeIsFilled &&
      numberOfBathroomsIsFilled &&
      numberOfRoomsIsFilled &&
      descriptionIsFilled
    );
    // const cityIsFilled = propertyInputInfos.name.trim() !== "";
  };

  const handleCreateBtnClick = async () => {
    if (isFilled() === false) {
      setErr(true);
      setErrorMessage("You should fill all mandatory fields");
      setOpenSnackbar(true);
    } else {
      const addProperty: createProperty = {
        name: propertyInputInfos.name,
        country: selectedCountry,
        city: propertyInputInfos.city,
        address: propertyInputInfos.address,
        zipCode: propertyInputInfos.zipCode,
        propertyDescription: propertyInputInfos.propertyDescription,
        propertyType: activeButton,
        numberOfBathrooms: Number(activeBathButton),
        numberOfRooms: Number(activeRoomButton),
        price: 0,
        userId: user?.id,

        facilities,
        amenities,
        meals,
      };

      console.log(addProperty);
      // return;

      const response = await AuthService().createProperty(addProperty);

      propertyInputInfos.address = "";
      propertyInputInfos.name = "";
      setSelectedCountry("");
      propertyInputInfos.city = "";
      propertyInputInfos.zipCode = 0;
      propertyInputInfos.propertyDescription = "";
      setActiveButton("false");
      setActiveBathButton("false");
      setActiveRoomButton("false");
      facilities.airConditioning = false;
      facilities.balcony = false;
      facilities.towel = false;
      facilities.tv = false;
      amenities.bikes = false;
      amenities.disabilitiesFriendly = false;
      amenities.garden = false;
      amenities.gym = false;
      amenities.kidsZone = false;
      amenities.parking = false;
      amenities.petsFriendly = false;
      amenities.swimmingPool = false;
      amenities.wifi = false;
      meals.breakfast = false;
      meals.dinner = false;
      meals.lunch = false;

      if (response.error.length !== 0) {
        setErr(true);
        setErrorMessage(response.error);
        setOpenSnackbar(true);
      } else {
        setSuccess(true);
        setSuccessMessage("Property created successfully!");
      }

      console.log(addProperty);
      console.log(selectedCountry);
    }
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
            sx={styleBtn("apartment", activeButton)}
          >
            <ApartmentIcon sx={{ fontSize: "50px" }} />
            Apartment
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleButtonClick("house")}
            sx={styleBtn("house", activeButton)}
          >
            <HouseIcon sx={{ fontSize: "50px" }} />
            House
          </Button>
          <Button
            variant="outlined"
            onClick={() => handleButtonClick("villa")}
            sx={styleBtn("villa", activeButton)}
          >
            <VillaIcon sx={{ fontSize: "50px" }} />
            Villa
          </Button>
        </Stack>

        <div className="name-component">
          <div className="title">Property Name</div>
          <input
            className="input-name"
            required
            name="name"
            placeholder="Write your property name"
            value={propertyInputInfos.name}
            onChange={handleInfosChange}
          />
        </div>
        <div className="adress-component">
          <div className="title">Property Adress</div>
          <input
            required
            className="input-adress"
            placeholder="Write your property adress"
            name="address"
            value={propertyInputInfos.address}
            onChange={handleInfosChange}
          />
        </div>

        <div className="adress-details-component">
          <div className="country-component">
            <div className="title">Country</div>
            <Country
              handleSelectCountry={handleSelectCountry}
              name="country"
              //   value={propertyInputInfos.country}
              //   onChange={handleInfosChange}
            />
          </div>

          <div className="zip-code-component">
            <div className="title">Zip Code</div>
            <input
              required
              className="input-zip-code"
              name="zipCode"
              value={propertyInputInfos.zipCode}
              onChange={handleInfosChange}
            />
          </div>

          <div className="city-component">
            <div className="title">City</div>

            <Autocomplete
              apiKey={API_KEY}
              className="input-city"
              placeholder="Select city"
              onPlaceSelected={(place) => {
                if (place.formatted_address) {
                  console.log(place);

                  propertyInputInfos.city = place.formatted_address;
                  console.log(propertyInputInfos.city);
                }
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
              sx={styleRoomBtn("1", activeRoomButton)}
            >
              1
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("2")}
              sx={styleRoomBtn("2", activeRoomButton)}
            >
              2
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("3")}
              sx={styleRoomBtn("3", activeRoomButton)}
            >
              3
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("4")}
              sx={styleRoomBtn("4", activeRoomButton)}
            >
              4
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("5")}
              sx={styleRoomBtn("5", activeRoomButton)}
            >
              5
              <BedIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleRoomButtonClick("6")}
              sx={styleRoomBtn("6", activeRoomButton)}
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
              sx={styleBathBtn("1", activeBathButton)}
            >
              1
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("2")}
              sx={styleBathBtn("2", activeBathButton)}
            >
              2
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("3")}
              sx={styleBathBtn("3", activeBathButton)}
            >
              3
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("4")}
              sx={styleBathBtn("4", activeBathButton)}
            >
              4
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("5")}
              sx={styleBathBtn("5", activeBathButton)}
            >
              5
              <BathtubIcon sx={{ fontSize: "40px" }} />
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleBathButtonClick("6")}
              sx={styleBathBtn("6", activeBathButton)}
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
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, petsFriendly: !prev.petsFriendly };
                })
              }
              sx={styleAmenityBtn(amenities.petsFriendly)}
            >
              <PetsIcon sx={{ fontSize: "30px" }} />
              Pet Friendly
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return {
                    ...prev,
                    disabilitiesFriendly: !prev.disabilitiesFriendly,
                  };
                })
              }
              sx={styleAmenityBtn(amenities.disabilitiesFriendly)}
            >
              <AccessibleIcon sx={{ fontSize: "40px" }} />
              Disabilities Friendly
            </Button>

            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, swimmingPool: !prev.swimmingPool };
                })
              }
              sx={styleAmenityBtn(amenities.swimmingPool)}
            >
              <PoolIcon sx={{ fontSize: "40px" }} />
              Swimming Pool
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, garden: !prev.garden };
                })
              }
              sx={styleAmenityBtn(amenities.garden)}
            >
              <DeckIcon sx={{ fontSize: "40px" }} />
              Garden
            </Button>
          </Stack>

          <Stack spacing={7} direction="row" sx={{ mt: "20px" }}>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, parking: !prev.parking };
                })
              }
              sx={styleAmenityBtn(amenities.parking)}
            >
              <DirectionsCarIcon sx={{ fontSize: "40px" }} />
              Parking
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, gym: !prev.gym };
                })
              }
              sx={styleAmenityBtn(amenities.gym)}
            >
              <FitnessCenterIcon sx={{ fontSize: "40px" }} />
              Gym
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, wifi: !prev.wifi };
                })
              }
              sx={styleAmenityBtn(amenities.wifi)}
            >
              <WifiIcon sx={{ fontSize: "35px" }} />
              Wi-fi
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, bikes: !prev.bikes };
                })
              }
              sx={styleAmenityBtn(amenities.bikes)}
            >
              <DirectionsBikeIcon sx={{ fontSize: "40px" }} />
              Bikes
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setAmenities((prev) => {
                  return { ...prev, kidsZone: !prev.kidsZone };
                })
              }
              sx={styleAmenityBtn(amenities.kidsZone)}
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
              onClick={() =>
                setMeals((prev) => {
                  return { ...prev, breakfast: !prev.breakfast };
                })
              }
              sx={styleMealBtn(meals.breakfast)}
            >
              <BakeryDiningIcon sx={{ fontSize: "50px" }} />
              Breakfast
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setMeals((prev) => {
                  return { ...prev, lunch: !prev.lunch };
                })
              }
              sx={styleMealBtn(meals.lunch)}
            >
              <RamenDiningIcon sx={{ fontSize: "50px" }} />
              Lunch
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setMeals((prev) => {
                  return { ...prev, dinner: !prev.dinner };
                })
              }
              sx={styleMealBtn(meals.dinner)}
            >
              <LunchDiningIcon sx={{ fontSize: "50px" }} />
              Dinner
            </Button>
          </Stack>
        </div>

        <div className="description-component">
          <div className="title">Property description:</div>
          <textarea
            required
            className="input-description"
            placeholder="Write your property description"
            name="propertyDescription"
            value={propertyInputInfos.propertyDescription}
            onChange={handleInfosChange}
          />
        </div>

        <div className="facilities-component">
          <div className="title">Facilities:</div>
          <Stack spacing={5} direction="row" sx={{ mt: "20px" }}>
            <Button
              variant="outlined"
              onClick={() =>
                setFacilities((prev) => {
                  return { ...prev, towel: !prev.towel };
                })
              }
              sx={styleAmenityBtn(facilities.towel)}
            >
              <DryCleaningIcon sx={{ fontSize: "40px" }} />
              Towels
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setFacilities((prev) => {
                  return { ...prev, balcony: !prev.balcony };
                })
              }
              sx={styleAmenityBtn(facilities.balcony)}
            >
              <BalconyIcon sx={{ fontSize: "35px" }} />
              Balcony
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setFacilities((prev) => {
                  return { ...prev, airConditioning: !prev.airConditioning };
                })
              }
              sx={styleAmenityBtn(facilities.airConditioning)}
            >
              <AcUnitIcon sx={{ fontSize: "40px" }} />
              Air conditioning
            </Button>
            <Button
              variant="outlined"
              onClick={() =>
                setFacilities((prev) => {
                  return { ...prev, tv: !prev.tv };
                })
              }
              sx={styleAmenityBtn(facilities.tv)}
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
        <button
          onClick={handleCreateBtnClick}
          // disabled={isFilled()}
          className="add-property-btn"
        >
          Create property
        </button>
      </div>

      {err && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          className="snackbarError"
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}

      {success && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={success}
          className="snackbarSuccess"
          autoHideDuration={5000}
          onClose={() => setSuccess(false)}
          sx={{ width: "100%" }}
        >
          <Alert severity="success" icon={<CheckIcon fontSize="inherit" />}>
            {successMessage}
          </Alert>
        </Snackbar>
      )}
    </MainComponent>
  );
};

export default AddProperty;
