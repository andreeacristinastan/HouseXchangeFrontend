import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import "./OwnedProperties.css";
import InfiniteLooper from "../utils/InfiniteLooper";
import { useUserStore } from "../utils/useUserStore";
import { UserInfosType } from "../utils/types/UserTypes";
import { jwtDecode } from "jwt-decode";
import {
  Property,
  ResponseGetAllPropertiesType,
} from "../utils/types/PropertyTypes";
import OwnedPropertiesCard from "./OwnedPropertiesCard";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import PropertyCard from "./PropertyCard";
import {
  ResponseGetAllTripsType,
  Trip,
  TripInfo,
} from "../utils/types/TripTypes";

// Register the necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OwnedProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [removedAProperty, setRemovedAProperty] = useState(false);
  const { user } = useUserStore();

  const bookingsByMonth = trips.reduce((acc, trip) => {
    const month = new Date(trip.checkInDate).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, Array(12).fill(0));

  const monthLabels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const bookingsData = bookingsByMonth.map((count, index) => ({
    month: monthLabels[index],
    bookings: count,
  }));

  const chartDataTrips = {
    labels: bookingsData.map((entry) => entry.month),
    datasets: [
      {
        label: "Bookings",
        data: bookingsData.map((entry) => entry.bookings),
        backgroundColor: "rgba(75, 192, 192, 1)", // Adjust color as needed
      },
    ],
  };

  const chartOptionsTrips = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white", // Legend label color
          font: {
            size: 16, // Legend label font size
          },
        },
      },
      title: {
        display: true,
        text: "Total Trips Booked for each month this year",
        color: "white", // Title color
        font: {
          size: 20, // Title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
    },
  };

  const cities = properties.map((property) => property.city);
  const cityCounts = cities.reduce((acc, city) => {
    acc[city] = (acc[city] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = {
    labels: Object.keys(cityCounts),
    datasets: [
      {
        label: "Number of Properties",

        data: Object.values(cityCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    color: "#fff",

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: "white", // Legend label color
          font: {
            size: 16, // Legend label font size
          },
        },
      },
      title: {
        display: true,
        color: "#fff",
        text: "Properties per City",
        font: {
          size: 20, // Title font size
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // X-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
      y: {
        ticks: {
          color: "white", // Y-axis label color
          font: {
            size: 15, // Title font size
          },
        },
      },
    },
  };
  const getProperties = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const res = await fetch(
          `http://localhost:8080/api/users/${user?.id}/properties`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token.replace(/"/g, "")}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          console.log("Eroare cand iei proprietatile userului");
          return;
        }

        const data: ResponseGetAllPropertiesType = await res.json();
        setProperties(
          data.map((property) => ({
            id: property.id,
            name: property.name,
            propertyType: property.propertyType,
            bathrooms: property.numberOfBathrooms,
            rooms: property.numberOfRooms,
            country: property.country,
            city: property.city,
            address: property.address,
            price: property.price,
            images: property.images,
            propertyDescription: property.propertyDescription,
            trips: property.trips,
          }))
        );

        console.log("Properties:");

        console.log(properties);
      }
    }
  };

  const getTrips = async () => {
    const token = localStorage.getItem("user");

    if (token) {
      const decodedToken: UserInfosType = jwtDecode(token);
      console.log(token);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp > currentTime && user) {
        const res = await fetch(`http://localhost:8080/api/trips`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token.replace(/"/g, "")}`,
            "Content-Type": "application/json",
          },
        });
        if (!res.ok) {
          console.log("Eroare cand iei proprietatile userului");
          return;
        }

        const data: ResponseGetAllTripsType = await res.json();
        setTrips(
          data.map((trip) => ({
            id: trip.id,
            numberOfPersons: trip.numberOfPersons,
            destination: trip.destination,
            minRange: trip.minRange,
            maxRange: trip.maxRange,
            checkInDate: trip.checkInDate,
            checkOutDate: trip.checkOutDate,
            userId: trip.userId,
            propertyId: trip.propertyId,
          }))
        );
      }
    }
  };

  useEffect(() => {
    getProperties();
    getTrips();
  }, []);

  useEffect(() => {
    getProperties();
    getTrips();
    setRemovedAProperty(false);
  }, [removedAProperty]);

  return (
    <div className="owned-properties-container">
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />

      <div className="center-container">
        <Typography
          color="inherit"
          variant="h2"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            width: "100%",
            color: "#fff",
          }}
        >
          Your beloved properties:
        </Typography>
        {properties.length > 3 ? (
          <InfiniteLooper speed={30} direction="left">
            <div className="container">
              <div className="scroll-container">
                {properties.map((property) => (
                  <div key={property.id}>
                    <OwnedPropertiesCard
                      property={property}
                      setRemovedAProperty={setRemovedAProperty}
                    />
                  </div>
                ))}
              </div>
            </div>
          </InfiniteLooper>
        ) : (
          <div className="container-fixed">
            <div className="scroll-container">
              {properties.map((property) => (
                <div key={property.id}>
                  <OwnedPropertiesCard
                    property={property}
                    setRemovedAProperty={setRemovedAProperty}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          // marked="center"
          sx={{
            fontFamily: '"Oswald", sans-serif',
            width: "70%",
            color: "#fff",
          }}
        >
          Some insights about your history with us:
        </Typography>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          <div style={{ flex: 1 }}>
            <Bar data={chartData} options={chartOptions} height={200} />
          </div>
          <div style={{ flex: 1 }}>
            <Bar
              data={chartDataTrips}
              options={chartOptionsTrips}
              height={200}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnedProperties;
