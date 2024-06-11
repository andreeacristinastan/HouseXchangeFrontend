import React, { useEffect, useState } from "react";
import "./TripsPage.css";
import Typography from "../utils/Typography";
import Pagination from "@mui/material/Pagination";
import TripCard from "./TripCard";
import { ResponseGetAllTripsType, Trip } from "../utils/types/TripTypes";
import { useUserStore } from "../utils/useUserStore";
import { ResponseTripsPagesType } from "../utils/types/PagesTypes";
import { UserInfosType } from "../utils/types/UserTypes";
import { jwtDecode } from "jwt-decode";

const TripsPage = () => {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [removedATrip, setRemovedATrip] = useState(false);
  const { user } = useUserStore();

  const getTrips = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const res = await fetch(
          `http://localhost:8080/api/users/${user?.id}/trips?page=${
            page - 1
          }&size=${3}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("Eroare cand iei calatorii");
          return;
        }

        const data: ResponseTripsPagesType = await res.json();
        setTotalPages(data.totalPages);
        const totalTrips: ResponseGetAllTripsType = data.content;
        setTrips(
          totalTrips.map((trip) => ({
            id: trip.id,
            numberOfPersons: trip.numberOfPersons,
            checkInDate: trip.checkInDate,
            checkOutDate: trip.checkOutDate,
            destination: trip.destination,
            minRange: trip.minRange,
            maxRange: trip.maxRange,
            userId: trip.userId,
            propertyId: trip.propertyId,
          }))
        );
        console.log(data);
      }
    }
  };

  useEffect(() => {
    getTrips();
  }, [page]);

  useEffect(() => {
    getTrips();
  }, [removedATrip]);

  return (
    <div className="main-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />

      {/* <h1 className="name-of-property-component">{property?.name}</h1> */}
      <Typography
        color="inherit"
        align="center"
        variant="h2"
        // marked="center"
        sx={{
          fontFamily: '"Oswald", sans-serif',
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2))`,
          marginBottom: "2rem ",
          color: "#fff",
          borderRadius: "48px",
          backdropFilter: "blur(10px)",
        }}
      >
        Welcome to your journeys, traveller!
        {/* {messages[0]} */}
      </Typography>
      <div className="box-container">
        {trips.map((trip) => (
          <div key={trip.id}>
            <TripCard trip={trip} setRemovedATrip={setRemovedATrip} />
          </div>
        ))}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            // transform: "translateY(200px)",
          }}
        >
          <Pagination
            defaultPage={1}
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            sx={{
              "& .MuiPaginationItem-root": {
                fontSize: "20px",

                color: "#fff",
              },
              "& .MuiPaginationItem-page.Mui-selected": {
                backgroundColor: "#87a9b0",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TripsPage;
