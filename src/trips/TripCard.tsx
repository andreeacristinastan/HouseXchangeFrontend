import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import { ResponseGetAllTripsType, Trip } from "../utils/types/TripTypes";
import {
  Property,
  ResponseGetPropertyByIdType,
} from "../utils/types/PropertyTypes";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
import "./TripCard.css";
import { useUserStore } from "../utils/useUserStore";
import { UserInfosType } from "../utils/types/UserTypes";
import { jwtDecode } from "jwt-decode";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import AuthService from "../services/AuthService";
import { CreateAvailabilityType } from "../utils/types/AvailabilityTypes";
import { convertStringToDate } from "../utils/convertStringToDate";

const labels: { [index: string]: string } = {
  0.5: "",
  1: "",
  1.5: "",
  2: "",
  2.5: "",
  3: "",
  3.5: "",
  4: "",
  4.5: "",
  5: "",
};

const TripCard = ({
  //   property,
  // imageUrl,
  trip,
  setRemovedATrip,
}: {
  //   property: Property;
  // imageUrl: string;
  trip: Trip;
  setRemovedATrip: (val: boolean) => void;
}) => {
  const [property, setProperty] = useState<ResponseGetPropertyByIdType | null>(
    null
  );
  const value = 3.5;
  const navigate = useNavigate();
  const { user } = useUserStore();
  const [removedTrip, setRemovedTrip] = useState(false);
  const [checkInString, setCheckInString] = useState("");
  const [checkOutString, setCheckOutString] = useState("");
  // let deleteTripStatus = false;

  const handleCloseBtn = () => {
    setRemovedTrip(false);
    setRemovedATrip(true);
  };

  const handlePropertyDetails = () => {
    navigate(`/property-details/${property?.id}`);
  };

  const handleCancelTrip = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const resp = await fetch(
          `http://localhost:8080/api/users/${user?.id}/trips/${trip.id}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!resp.ok) {
          console.log("eroare cand stergi trip user logat");

          return;
        }

        const r = await fetch(
          `http://localhost:8080/api/users/${property?.userId}/trips-all`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!r.ok) {
          console.log("Eroare cand iei calatorii");
          return;
        }

        const data: ResponseGetAllTripsType = await r.json();
        for (const tripPropertyUser of data) {
          console.log("curr trip is: " + tripPropertyUser);

          if (
            tripPropertyUser.userId === property?.userId &&
            trip.checkInDate === tripPropertyUser.checkInDate &&
            trip.checkOutDate === tripPropertyUser.checkOutDate
          ) {
            const res = await fetch(
              `http://localhost:8080/api/users/${property?.userId}/trips/${tripPropertyUser.id}`,
              {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token.replace(/"/g, "")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!res.ok) {
              console.log("eroare cand stergi trip curent user logat");

              return;
            }

            const addAvailability: CreateAvailabilityType = {
              userId: property?.userId,
              propertyId: property?.id,
              startDate: new Date(trip.checkInDate).toLocaleDateString("en-GB"),
              endDate: new Date(trip.checkOutDate).toLocaleDateString("en-GB"),
            };

            const response = await AuthService().createAvailability(
              addAvailability
            );
            if (response.error.length !== 0) {
              console.log(
                "eroare cand bagi a valabilitate pentru user diferit de ala curent"
              );

              return;
            }

            const addAvailabilityCurrUser: CreateAvailabilityType = {
              userId: user?.id,
              propertyId: tripPropertyUser?.propertyId,
              startDate: new Date(trip.checkInDate).toLocaleDateString("en-GB"),
              endDate: new Date(trip.checkOutDate).toLocaleDateString("en-GB"),
            };

            const re = await AuthService().createAvailability(
              addAvailabilityCurrUser
            );
            if (re.error.length !== 0) {
              console.log("eroare cand bagi a valabilitate pentru usercurent");

              return;
            }
            // deleteTripStatus = true;
            setRemovedTrip(true);
          }
        }
      }
    }
  };

  // useEffect(() => {
  //   if (deleteTripStatus === true) {
  //     setRemovedATrip(true);
  //     setRemovedTrip(true);
  //   }
  //   // getPropertyById();
  // }, [deleteTripStatus]);

  useEffect(() => {
    getPropertyById();
    // let newDate = new Date(trip.checkInDate);
    // const m = newDate.getTime() + 3 * 60 * 60 * 1000;
    // console.log(
    //   "my dates are: " +
    //     new Date(trip.checkInDate) +
    //     " and " +
    //     new Date(trip.checkOutDate)
    // );

    setCheckInString(new Date(trip.checkInDate).toLocaleDateString("en-GB"));
    setCheckOutString(new Date(trip.checkOutDate).toLocaleDateString("en-GB"));
  }, []);

  const getPropertyById = async () => {
    const res = await fetch(
      `http://localhost:8080/api/properties/${trip.propertyId}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      return;
    }

    const data: ResponseGetPropertyByIdType = await res.json();
    setProperty({
      id: data.id,
      name: data.name,
      propertyDescription: data.propertyDescription,
      propertyType: data.propertyType,
      numberOfBathrooms: data.numberOfBathrooms,
      numberOfRooms: data.numberOfRooms,
      country: data.country,
      city: data.city,
      address: data.address,
      price: data.price,
      images: data.images,
      zipCode: data.zipCode,
      userId: data.userId,
      trips: data.trips,
      mealInfo: data.mealInfo,
      amenityInfo: data.amenityInfo,
      facilityDto: data.facilityDto,
    });
  };
  // setUserProperty({
  //   id: data.id,
  //   city: data.city,
  // });

  // console.log("selected property is:");
  return (
    <>
      <Card
        sx={{
          display: "flex",
          // justifyContent: "center",
          width: "1060px",
          // maxWidth: "900px",
          height: "300px",
          boxShadow: "20px 12px 15px 2px rgba(0, 0, 0, 0.4)",
        }}
      >
        {/* <CardActionArea> */}
        <CardMedia
          component="img"
          sx={{
            flex: 1,
            maxWidth: "50%",
            // maxHeight: "30%",
            // backgroundSize: "cover",
            // backgroundRepeat: "no-repeat",
            aspectRatio: "3/1",
          }}
          // height="50%"
          image={property?.images[0].url}
          alt={property?.name}
        />
        <CardContent
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            // maxHeight: "2%",
            // maxWidth: "1%",
            padding: "2%",
            flex: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color={"#588b97"}
          >
            {property?.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            minHeight={"40px"}
            maxHeight={"40px"}
            overflow={"hidden"}
            align="left"
          >
            {property?.propertyDescription}
          </Typography>
          <Box
            sx={{
              // width: "200px",
              display: "flex",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <Rating
              name="text-feedback"
              value={value}
              readOnly
              precision={0.5}
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
            <Box>{labels[value]}</Box>
          </Box>

          <div style={{ display: "flex" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ marginTop: "20px", color: "#588b97" }}
              >
                Booking dates:
              </Typography>
              <Typography
                fontWeight="normal"
                component="div"
                sx={{ color: "#588b97", fontFamily: "Oswald, sans-serif" }}
              >
                {checkInString} - {checkOutString}
              </Typography>

              <CardActions sx={{ paddingTop: "20px" }}>
                <button
                  onClick={() => handlePropertyDetails()}
                  className="see-curr-property"
                >
                  See details
                </button>
              </CardActions>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingLeft: "50px",
              }}
            >
              <Typography
                variant="h5"
                component="div"
                sx={{ marginTop: "20px", color: "#588b97" }}
              >
                City:
              </Typography>
              <Typography
                component="div"
                sx={{ color: "#588b97", fontFamily: "Oswald, sans-serif" }}
              >
                {property?.city}
              </Typography>
              <CardActions sx={{ paddingTop: "20px" }}>
                <button
                  onClick={() => handleCancelTrip()}
                  className="see-property"
                >
                  Cancel Trip
                </button>
              </CardActions>
            </div>
          </div>
        </CardContent>
        {/* </CardActionArea> */}
      </Card>

      <Dialog open={removedTrip} onClose={() => handleCloseBtn()}>
        <DialogTitle color={"rgb(8, 124, 8)"}>{"Great news! 🥳"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Your trip has been removed!</DialogContentText>
          <DialogContentText>
            {" "}
            Your property is now available for that period again!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseBtn()}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TripCard;
