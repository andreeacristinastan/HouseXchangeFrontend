import { useEffect, useState } from "react";
import styled from "@mui/material/styles/styled";
import "react-slideshow-image/dist/styles.css";
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useLocation } from "react-router-dom";
import {
  PropertyInfosUserType,
  ResponseGetPropertyByIdType,
  ResponsePropertyInfoType,
} from "../utils/types/PropertyTypes";
import { ResponseImageInfoType } from "../utils/types/ImageTypes";
import PublicIcon from "@mui/icons-material/Public";
import { properties } from "../utils/ArrowButtonStyle";
import "./DisplayPropertyDetails.css";
import Button from "@mui/material/Button";
import ApartmentIcon from "@mui/icons-material/Apartment";
import HouseIcon from "@mui/icons-material/House";
import VillaIcon from "@mui/icons-material/Villa";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PetsIcon from "@mui/icons-material/Pets";
import AccessibleIcon from "@mui/icons-material/Accessible";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PoolIcon from "@mui/icons-material/Pool";
import DeckIcon from "@mui/icons-material/Deck";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import PinDropRoundedIcon from "@mui/icons-material/PinDropRounded";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import LunchDiningIcon from "@mui/icons-material/LunchDining";
import DryCleaningIcon from "@mui/icons-material/DryCleaning";
import TvIcon from "@mui/icons-material/Tv";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import BalconyIcon from "@mui/icons-material/Balcony";
import { styleBtn, styleRectangleBtn } from "./buttonsStyle";
import Calendar from "react-calendar";
import CircularProgress from "@mui/material/CircularProgress";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { convertStringToDate } from "../utils/convertStringToDate";
import { jwtDecode } from "jwt-decode";

import DialogActions from "@mui/material/DialogActions";
import {
  Availability,
  CreateAvailabilityType,
  ResponseAllAvailabilitiesType,
} from "../utils/types/AvailabilityTypes";
import { UserInfosType } from "../utils/types/UserTypes";
import { PostTripType } from "../utils/types/TripTypes";
import { useUserStore } from "../utils/useUserStore";
import { useFilterStore } from "../utils/useFilterStore";
import Paper from "@mui/material/Paper";
import SelectProperty from "./SelectProperty";
import AuthService from "../services/AuthService";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const MainComponent = styled("section")(({ theme }) => ({
  color: theme.palette.common.white,
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  // [theme.breakpoints.up("sm")]: {
  //   height: "140vh",
  // },
  // backgroundImage: `url(${backgroundImage})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  //   backgroundAttachment: "fixed",
}));

const DisplayPropertyDetails = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const propertyId = pathname.split("/")[2];
  const [property, setProperty] = useState<ResponseGetPropertyByIdType>();
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const { user } = useUserStore();
  const [showErr, setShowErr] = useState(false);
  const [showAvailabilityTrue, setShowAvailabilityTrue] = useState(false);
  const [showAvailabilityFalse, setShowAvailabilityFalse] = useState(false);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [err, setErr] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const filters = useFilterStore((state) => state.searchDetails);
  const [isLoading, setIsLoading] = useState(false);
  const [createdTrip, setCreatedTrip] = useState(false);
  const [toBeRemovedAvailability, setToBeRemovedAvailability] =
    useState<Availability | null>(null);
  const [toBeRemovedAvailabilityCurrUser, setToBeRemovedAvailabilityCurrUser] =
    useState<Availability | null>(null);
  const [selectedProperty, setSelectedProperty] =
    useState<ResponsePropertyInfoType | null>(null);
  const [userPropriety, setUserProperty] =
    useState<PropertyInfosUserType | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const selectProperty = (param: ResponsePropertyInfoType) => {
    setSelectedProperty(param);
  };
  const [isStartDateEqual, setIsStartDateEqual] = useState(false);
  const [isEndDateEqual, setIsEndDateEqual] = useState(false);
  const [isStartDateEqualCurrUser, setIsStartDateEqualCurrUser] =
    useState(false);
  const [isEndDateEqualCurrUser, setIsEndDateEqualCurrUser] = useState(false);
  const resetFilters = useFilterStore((state) => state.resetSearchDetails);

  useEffect(() => {
    // getAllProperties();
    getPropertyById();

    getAllAvailabilities();
    if (filters.checkIn.length !== 0 && filters.checkOut.length !== 0) {
      console.log("values are:");
      console.log(convertStringToDate(filters.checkIn));
      console.log(convertStringToDate(filters.checkOut));

      setDateRange([
        convertStringToDate(filters.checkIn),
        convertStringToDate(filters.checkOut),
      ]);
    }
    // console.log("========================filters are:");

    // console.log(filters);
    // console.log("========================prices are:");

    // console.log(newPriceRange);
  }, []);

  useEffect(() => {
    getPropertyById();

    getAllAvailabilities();
  }, [createdTrip]);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  const getAllAvailabilities = async () => {
    const res = await fetch(`http://localhost:8080/api/availabilities`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: ResponseAllAvailabilitiesType = await res.json();
    // setTotalPages(data.totalPages);
    // const totalProperties: ResponseGetAllPropertiesType = data.content;
    setAvailabilities(
      data.map((availability) => ({
        id: availability.id,
        userId: availability.userId,
        propertyId: availability.propertyId,
        startDate: availability.startDate,
        endDate: availability.endDate,
      }))
    );
    console.log(data);
  };

  const handleClickButton = () => {
    if (dateRange[0] === null || dateRange[1] === null) {
      setShowErr(true);
      return;
    }

    if (!selectedProperty) {
      setErr(true);
      setErrorMessage("No exchange property has been selected!");
      setOpenSnackbar(true);
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (filterByDates()) {
        setShowAvailabilityTrue(true);
      } else {
        setShowAvailabilityFalse(true);
      }
      // navigate("/properties/all");
    }, 3000);
  };

  const filterByDates = () => {
    console.log("Availabs:");

    if (dateRange[0] === null || dateRange[1] === null) {
      setShowErr(true);
      return false;
    }

    for (const a of availabilities) {
      const convertedStartDate = convertStringToDate(a.startDate);
      const convertedEndDate = convertStringToDate(a.endDate);
      const filteredCheckIn = convertStringToDate(
        dateRange[0]?.toLocaleDateString("en-GB")
      );
      const filteredCheckOut = convertStringToDate(
        dateRange[1]?.toLocaleDateString("en-GB")
      );

      if (
        a.propertyId === selectedProperty?.id &&
        filteredCheckIn >= convertedStartDate &&
        filteredCheckOut <= convertedEndDate
      ) {
        if (filteredCheckIn === convertedStartDate) {
          setIsStartDateEqualCurrUser(true);
        }

        if (filteredCheckOut === convertedEndDate) {
          setIsEndDateEqualCurrUser(true);
        }
        setToBeRemovedAvailabilityCurrUser(a);
      }

      if (
        a.propertyId === property?.id &&
        filteredCheckIn >= convertedStartDate &&
        filteredCheckOut <= convertedEndDate
      ) {
        if (filteredCheckIn === convertedStartDate) {
          setIsStartDateEqual(true);
        }

        if (filteredCheckOut === convertedEndDate) {
          setIsEndDateEqual(true);
        }

        setToBeRemovedAvailability(a);
        return true;
      }
    }
  };

  const handleClose = () => {
    setShowErr(false);
  };

  const handleCloseAvailability = () => {
    setDateRange([null, null]);
    setShowAvailabilityTrue(false);
    setShowAvailabilityFalse(false);
    setCreatedTrip(false);
  };

  const handleCloseBooking = async (confirm: boolean) => {
    setShowAvailabilityTrue(false);
    // const handleClose = async (confirm: boolean) => {
    if (confirm && selectedProperty) {
      const token = localStorage.getItem("user");

      if (token) {
        const decodedToken: UserInfosType = jwtDecode(token);
        console.log(token);

        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime && user) {
          const values: PostTripType = {
            numberOfPersons: 0,
            destination: property?.city,
            minRange: 0,
            maxRange: 0,
            checkInDate: dateRange[0],
            checkOutDate: dateRange[1],
            userId: user?.id,
            propertyId: property?.id,
          };
          const res = await fetch(`http://localhost:8080/api/trip`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          if (!res.ok) {
            return;
          }
          if (user?.role !== "GUEST") {
            // console.log("selected property is:");
            // console.log(selectedProperty.id);

            const r = await fetch(
              `http://localhost:8080/api/properties/${selectedProperty.id}`,
              {
                method: "GET",
              }
            );
            if (!r.ok) {
              return;
            }

            const data: PropertyInfosUserType = await r.json();
            // setUserProperty({
            //   id: data.id,
            //   city: data.city,
            // });

            console.log("selected property is:");
            console.log(userPropriety?.city);

            const values: PostTripType = {
              numberOfPersons: 0,
              destination: data.city,
              minRange: 0,
              maxRange: 0,
              checkInDate: dateRange[0],
              checkOutDate: dateRange[1],
              userId: property?.userId,
              propertyId: property?.id,
            };
            const res = await fetch(`http://localhost:8080/api/trip`, {
              method: "POST",
              headers: {
                Authorization: `Bearer ${token.replace(/"/g, "")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });
            if (!res.ok) {
              return;
            }
          }

          if (toBeRemovedAvailability) {
            const resp = await fetch(
              `http://localhost:8080/api/availabilities/${toBeRemovedAvailability.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!resp.ok) {
              console.log("eroare cand stergi disponibilitatea veche");

              return;
            }

            if (!isStartDateEqual) {
              const addAvailability: CreateAvailabilityType = {
                userId: property?.userId,
                propertyId: property?.id,
                startDate: toBeRemovedAvailability?.startDate,
                endDate: dateRange[0]?.toLocaleDateString("en-GB"),
              };

              const response = await AuthService().createAvailability(
                addAvailability
              );
              if (response.error.length !== 0) {
                console.log("eroare cand bagi prima noua valabilitate");
              }
              // console.log(response);
            }

            if (!isEndDateEqual) {
              const addAvailability: CreateAvailabilityType = {
                userId: property?.userId,
                propertyId: property?.id,
                startDate: dateRange[1]?.toLocaleDateString("en-GB"),
                endDate: toBeRemovedAvailability?.endDate,
              };

              const response = await AuthService().createAvailability(
                addAvailability
              );
              if (response.error.length !== 0) {
                console.log("eroare cand bagi a doua noua valabilitate");

                // tokens.map((token) => {
                //   revert(
                //     token,
                //     () => {},
                //     () => {}
                //   );
                // });
                // setErr(true);
                // setErrorMessage(response.error);
                // setOpenSnackbar(true);
              }
            }
          }

          if (toBeRemovedAvailabilityCurrUser) {
            const resp = await fetch(
              `http://localhost:8080/api/availabilities/${toBeRemovedAvailabilityCurrUser.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!resp.ok) {
              console.log("eroare cand stergi disponibilitatea veche");

              return;
            }

            if (!isStartDateEqualCurrUser) {
              const addAvailability: CreateAvailabilityType = {
                userId: user.id,
                propertyId: selectedProperty.id,
                startDate: toBeRemovedAvailabilityCurrUser.startDate,
                endDate: dateRange[0]?.toLocaleDateString("en-GB"),
              };

              const response = await AuthService().createAvailability(
                addAvailability
              );
              if (response.error.length !== 0) {
                console.log(
                  "eroare cand bagi prima noua valabilitate curr user"
                );
              }
              // console.log(response);
            }

            if (!isEndDateEqualCurrUser) {
              const addAvailability: CreateAvailabilityType = {
                userId: user.id,
                propertyId: selectedProperty.id,
                startDate: dateRange[1]?.toLocaleDateString("en-GB"),
                endDate: toBeRemovedAvailabilityCurrUser.endDate,
              };

              const response = await AuthService().createAvailability(
                addAvailability
              );
              if (response.error.length !== 0) {
                console.log(
                  "eroare cand bagi a doua noua curr user valabilitate"
                );
              }
            }
          }
        }

        setCreatedTrip(true);
      }
    } else {
      setErr(true);
      setErrorMessage("No exchange property has been selected!");
      setOpenSnackbar(true);
    }
    setDateRange([null, null]);
    resetFilters();
    setToBeRemovedAvailability(null);
    setToBeRemovedAvailabilityCurrUser(null);
    setSelectedProperty(null);
    setUserProperty(null);
    setIsStartDateEqual(false);
    setIsEndDateEqual(false);
    setIsStartDateEqualCurrUser(false);
    setIsEndDateEqualCurrUser(false);

    // setOpen(false);
    // };
  };

  const handleCancelButtonClick = () => {
    setDateRange([null, null]);
  };

  const handleChangeButton = (val) => {
    setDateRange(val);
  };

  const getPropertyById = async () => {
    const res = await fetch(
      `http://localhost:8080/api/properties/${propertyId}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      // console.log(await res);

      return;
    }

    const data: ResponseGetPropertyByIdType = await res.json();
    // setTotalPages(data.totalPages);
    // const totalProperties: ResponseGetAllPropertiesType = data.content;
    setProperty({
      id: data.id,
      name: data.name,
      propertyType: data.propertyType,
      numberOfBathrooms: data.numberOfBathrooms,
      numberOfRooms: data.numberOfRooms,
      country: data.country,
      city: data.city,
      address: data.address,
      price: data.price,
      images: data.images,
      propertyDescription: data.propertyDescription,
      trips: data.trips,
      mealInfo: data.mealInfo,
      facilityDto: data.facilityDto,
      userId: data.userId,
      zipCode: data.zipCode,
      amenityInfo: data.amenityInfo,
    });
    console.log(data);
  };

  // useEffect(() => {
  // }, []);

  useEffect(() => {
    property?.images.map((i: ResponseImageInfoType) => {
      console.log(i.url);
    });
  }, [property]);

  return (
    <div className="main-component">
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />

      {/* <h1 className="name-of-property-component">{property?.name}</h1> */}
      <div className="box-container">
        <div className="name-description-images-component">
          <div className="title-description-component">
            <p className="name-text">{property?.name}</p>
            <p className="description-text">{property?.propertyDescription}</p>
            <div className="address-details-component">
              {property?.country && (
                <div>
                  <div className="title">Country:</div>
                  <Button variant="outlined" sx={styleBtn()}>
                    <PublicIcon sx={{ fontSize: "50px" }} />
                    {property.country}
                  </Button>
                </div>
              )}
              {property?.city && (
                <div>
                  <div className="title">City:</div>
                  <Button variant="outlined" sx={styleBtn()}>
                    <ApartmentRoundedIcon sx={{ fontSize: "50px" }} />
                    {property.city}
                  </Button>
                </div>
              )}
              {property?.address && (
                <div>
                  <div className="title">Address:</div>
                  <Button variant="outlined" sx={styleBtn()}>
                    <PinDropRoundedIcon sx={{ fontSize: "50px" }} />
                    {property.address}
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="slide-container">
            <Fade {...properties} cssClass="slide-box">
              {property?.images.map((image: ResponseImageInfoType) => (
                <img
                  key={image.id}
                  style={{
                    width: "100%",
                    height: "100%",
                    maxHeight: "450px",
                    maxWidth: "450px",
                  }}
                  src={image.url}
                />
              ))}
            </Fade>
          </div>
        </div>

        <div className="deatils-calendar-component">
          <div className="details-all-rows-component">
            <div className="details-component">
              {property?.propertyType === "apartment" ? (
                <Button variant="outlined" sx={styleBtn()}>
                  <ApartmentIcon sx={{ fontSize: "50px" }} />
                  Apartment
                </Button>
              ) : property?.propertyType === "house" ? (
                <Button variant="outlined" sx={styleBtn()}>
                  <HouseIcon sx={{ fontSize: "50px" }} />
                  House
                </Button>
              ) : (
                <Button variant="outlined" sx={styleBtn()}>
                  <VillaIcon sx={{ fontSize: "50px" }} />
                  Villa
                </Button>
              )}
              <Button variant="outlined" sx={styleBtn()}>
                <BedIcon sx={{ fontSize: "50px" }} />
                {property?.numberOfRooms} rooms
              </Button>
              <Button variant="outlined" sx={styleBtn()}>
                <BathtubIcon sx={{ fontSize: "50px" }} />
                {property?.numberOfBathrooms} bathrooms
              </Button>

              {property?.amenityInfo.bikes && (
                <Button variant="outlined" sx={styleBtn()}>
                  <DirectionsBikeIcon sx={{ fontSize: "50px" }} />
                  Bikes
                </Button>
              )}
              {property?.amenityInfo.disabilitiesFriendly && (
                <Button variant="outlined" sx={styleBtn()}>
                  <AccessibleIcon sx={{ fontSize: "50px" }} />
                  Disabilities Friendly
                </Button>
              )}
              {property?.amenityInfo.garden && (
                <Button variant="outlined" sx={styleBtn()}>
                  <DeckIcon sx={{ fontSize: "50px" }} />
                  Garden
                </Button>
              )}
              {property?.amenityInfo.gym && (
                <Button variant="outlined" sx={styleBtn()}>
                  <FitnessCenterIcon sx={{ fontSize: "50px" }} />
                  Gym
                </Button>
              )}
              {property?.amenityInfo.kidsZone && (
                <Button variant="outlined" sx={styleBtn()}>
                  <ChildCareIcon sx={{ fontSize: "50px" }} />
                  Kids Zone
                </Button>
              )}
              {property?.amenityInfo.parking && (
                <Button variant="outlined" sx={styleBtn()}>
                  <DirectionsCarIcon sx={{ fontSize: "50px" }} />
                  Parking
                </Button>
              )}
              {property?.amenityInfo.petsFriendly && (
                <Button variant="outlined" sx={styleBtn()}>
                  <PetsIcon sx={{ fontSize: "50px" }} />
                  Pets Friendly
                </Button>
              )}
              {property?.amenityInfo.swimmingPool && (
                <Button variant="outlined" sx={styleBtn()}>
                  <PoolIcon sx={{ fontSize: "50px" }} />
                  Swimming Pool
                </Button>
              )}
              {property?.amenityInfo.wifi && (
                <Button variant="outlined" sx={styleBtn()}>
                  <DirectionsBikeIcon sx={{ fontSize: "50px" }} />
                  Wi-fi
                </Button>
              )}
              {property?.facilityDto.airConditioning && (
                <Button variant="outlined" sx={styleBtn()}>
                  <AcUnitIcon sx={{ fontSize: "50px" }} />
                  Air Conditioning
                </Button>
              )}
              {property?.facilityDto.balcony && (
                <Button variant="outlined" sx={styleBtn()}>
                  <BalconyIcon sx={{ fontSize: "50px" }} />
                  Balcony
                </Button>
              )}
              {property?.facilityDto.towel && (
                <Button variant="outlined" sx={styleBtn()}>
                  <DryCleaningIcon sx={{ fontSize: "50px" }} />
                  Towels
                </Button>
              )}
              {property?.facilityDto.tv && (
                <Button variant="outlined" sx={styleBtn()}>
                  <TvIcon sx={{ fontSize: "50px" }} />
                  Tv
                </Button>
              )}
              {property?.mealInfo.breakfast && (
                <Button variant="outlined" sx={styleBtn()}>
                  <BakeryDiningIcon sx={{ fontSize: "50px" }} />
                  Breakfast
                </Button>
              )}
              {property?.mealInfo.lunch && (
                <Button variant="outlined" sx={styleBtn()}>
                  <RamenDiningIcon sx={{ fontSize: "50px" }} />
                  Lunch
                </Button>
              )}
              {property?.mealInfo.dinner && (
                <Button variant="outlined" sx={styleBtn()}>
                  <LunchDiningIcon sx={{ fontSize: "50px" }} />
                  Dinner
                </Button>
              )}
            </div>
          </div>

          <div className="booking-details">
            {user?.role === "HOST" && (
              <>
                <div className="title">Choose your exchange property:</div>
                <Paper
                  sx={{
                    width: "100%",

                    marginBottom: "2%",
                  }}
                >
                  <SelectProperty
                    selectedProperty={selectedProperty}
                    setSelectedProperty={selectProperty}
                    properties={user?.properties}
                  />
                </Paper>
              </>
            )}

            <div className="calendar-box">
              <div className="title">Start booking:</div>
              <div className="price-component">
                <div className="price">RON{property?.price} </div>
                <div className="text"> per night</div>
              </div>
              <div className="title">Check property availability:</div>
              {/* </div> */}
              <Calendar
                // onChange={(val) => setDateRange(val)}
                onChange={handleChangeButton}
                value={dateRange}
                selectRange
              />
              <div className="buttons-component">
                <Button
                  variant="outlined"
                  onClick={() => handleCancelButtonClick()}
                  sx={styleRectangleBtn()}
                >
                  Cancel selection
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleClickButton}
                  sx={styleRectangleBtn()}
                >
                  Check Availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
              Checking property availability...
            </p>
          </div>
        </div>
      )}

      <Dialog open={showErr} onClose={() => handleClose()}>
        <DialogTitle color={"#f58989"}>{"Warning! 🥺"}</DialogTitle>
        <DialogContent>
          <DialogContentText>You should select a valid date</DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            label="Check-in Date"
            type="date"
            fullWidth
            value={checkInDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckInDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Check-out Date"
            type="date"
            fullWidth
            value={checkOutDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckOutDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Number of persons"
            type="number"
            fullWidth
            value={num}
            onChange={(event) => setNumber(parseInt(event.target.value, 10))}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose()}>Ok</Button>
          {/* <Button onClick={() => handleClose(true)} autoFocus>
            Add
          </Button> */}
        </DialogActions>
      </Dialog>
      <Dialog
        open={showAvailabilityTrue}
        onClose={() => handleCloseAvailability()}
      >
        <DialogTitle color={"rgb(8, 124, 8)"}>{"Great news! 🥳"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Property has availability for you!
          </DialogContentText>
          <DialogContentText>
            {" "}
            You can start book your trip now!
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            label="Check-in Date"
            type="date"
            fullWidth
            value={checkInDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckInDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Check-out Date"
            type="date"
            fullWidth
            value={checkOutDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckOutDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Number of persons"
            type="number"
            fullWidth
            value={num}
            onChange={(event) => setNumber(parseInt(event.target.value, 10))}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAvailability()}>Cancel</Button>
          <Button onClick={() => handleCloseBooking(true)} autoFocus>
            Book now
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showAvailabilityFalse}
        onClose={() => handleCloseAvailability()}
      >
        <DialogTitle color={"#f58989"}>{"Bad news! 🥺"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            There are no spots available for this period
          </DialogContentText>

          {/* <TextField
            autoFocus
            margin="dense"
            label="Check-in Date"
            type="date"
            fullWidth
            value={checkInDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckInDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Check-out Date"
            type="date"
            fullWidth
            value={checkOutDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckOutDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Number of persons"
            type="number"
            fullWidth
            value={num}
            onChange={(event) => setNumber(parseInt(event.target.value, 10))}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAvailability()}>Cancel</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={createdTrip} onClose={() => handleCloseAvailability()}>
        <DialogTitle color={"rgb(8, 124, 8)"}>{"Great news! 🥳"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Your trip has been booked!</DialogContentText>
          <DialogContentText>
            {" "}
            Get ready for your new adventure!
          </DialogContentText>
          {/* <TextField
            autoFocus
            margin="dense"
            label="Check-in Date"
            type="date"
            fullWidth
            value={checkInDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckInDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Check-out Date"
            type="date"
            fullWidth
            value={checkOutDate.toISOString().substr(0, 10)}
            onChange={(event) => setCheckOutDate(new Date(event.target.value))}
          />
          <TextField
            margin="dense"
            label="Number of persons"
            type="number"
            fullWidth
            value={num}
            onChange={(event) => setNumber(parseInt(event.target.value, 10))}
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseAvailability()}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {err && (
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={openSnackbar}
          className="snackbarError"
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Snackbar>
      )}
    </div>
  );
};

export default DisplayPropertyDetails;
