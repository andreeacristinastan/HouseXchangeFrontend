import React, { useEffect, useState } from "react";
import {
  Property,
  ResponseGetAllPropertiesType,
} from "../utils/types/PropertyTypes";
import PropertyCard from "./PropertyCard";
import "./DisplayAllProperties.css";
import backgroundImage from "../utils/images/stacked-waves-haikei2.png";
import backgroundStart from "../utils/images/pexels-solliefoto-298842.jpg";
import SearchProperties from "../utils/SearchProperties";
import PriceRangeSlider from "../utils/PriceRangeSlider";
import Typography from "../utils/Typography";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import { ResponsePropertiesPagesType } from "../utils/types/PagesTypes";
import { useActionData } from "react-router-dom";

const DisplayAllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [defaultImageId, setDefaultImageId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getProperties = async () => {
    const res = await fetch(
      `http://localhost:8080/api/properties?page=${page - 1}&size=${8}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: ResponsePropertiesPagesType = await res.json();
    setTotalPages(data.totalPages);
    const totalProperties: ResponseGetAllPropertiesType = data.content;
    setProperties(
      totalProperties.map((property) => ({
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
      }))
    );

    console.log(data);
  };

  useEffect(() => {
    getProperties();
  }, [page]);

  return (
    // <MainComponent>

    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "200vh",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <div
        className="bottom-page"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${backgroundStart})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "30%",
        }}
      >
        <Typography
          color="inherit"
          align="center"
          variant="h2"
          marked="center"
          sx={{
            transform: "translateY(300px)",
            mt: { xs: 4 },
            fontFamily: '"Oswald", sans-serif',
            color: "#fff",
            position: "absolute",
            top: "1%",
          }}
        >
          Seamless house rentals for Every Lifestyle
        </Typography>

        <div className="search-box">
          <PriceRangeSlider />
          <SearchProperties showTitle={true} />
        </div>
      </div>
      <div className="all-properties-box">
        {properties.map((property) => (
          <div key={property.id}>
            <PropertyCard
              property={property}
              imageUrl={property.images[0]?.url}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          transform: "translateY(200px)",
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

              color: "#fff", // Change the color of the pagination items
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#87a9b0", // Change the background color of the selected item
            },
          }}
        />
      </div>
    </div>
  );
};

export default DisplayAllProperties;
