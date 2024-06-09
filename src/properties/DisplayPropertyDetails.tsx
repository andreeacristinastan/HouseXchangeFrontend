import React, { useDebugValue, useEffect, useState } from "react";
import backgroundImage from "../utils/images/blurry-gradient-haikei.png";
import styled from "@mui/material/styles/styled";
import "react-slideshow-image/dist/styles.css";
import { Slide } from "react-slideshow-image";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import { useLocation } from "react-router-dom";
import {
  Property,
  ResponseGetPropertyByIdType,
} from "../utils/types/PropertyTypes";
import { ResponseImageInfoType } from "../utils/types/ImageTypes";
import CardMedia from "@mui/material/CardMedia";

const divStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
  height: "500px",
};

const buttonStyleLeft = {
  width: "30px",
  background: "none",
  marginLeft: "38%",
  border: "0px",
};

const buttonStyleRight = {
  width: "30px",
  background: "none",
  marginRight: "38%",
  border: "0px",
};

const properties = {
  prevArrow: (
    <button style={{ ...buttonStyleLeft }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M242 180.6v-138L0 256l242 213.4V331.2h270V180.6z" />
      </svg>
    </button>
  ),
  nextArrow: (
    <button style={{ ...buttonStyleRight }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="#fff">
        <path d="M512 256L270 42.6v138.2H0v150.6h270v138z" />
      </svg>
    </button>
  ),
};

const DisplayPropertyDetails = () => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  const propertyId = pathname.split("/")[2];
  const [property, setProperty] = useState<Property>();

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
      bathrooms: data.numberOfBathrooms,
      rooms: data.numberOfRooms,
      country: data.country,
      city: data.city,
      address: data.address,
      price: data.price,
      images: data.images,
      propertyDescription: data.propertyDescription,
    });
    console.log(data);
  };

  useEffect(() => {
    getPropertyById();
  }, []);

  useEffect(() => {
    property?.images.map((i: ResponseImageInfoType) => {
      console.log(i.url);
    });
  }, [property]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        position: "relative",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap"
        rel="stylesheet"
      />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@900&family=Spicy+Rice&display=swap" />

      {/* <Slide >
        {property?.images.map((image: ResponseImageInfoType) => (
          <div key={image.id}>
            <div
              style={{ ...divStyle, backgroundImage: `url(${image.url})` }}
            />
          </div>
        ))}
      </Slide> */}
      <div
        style={{
          marginTop: "70px",
        }}
      >
        <Zoom scale={0.4} {...properties}>
          {property?.images.map((image: ResponseImageInfoType) => (
            <img
              key={image.id}
              style={{
                width: "20%",
                height: "100%",
                maxHeight: "550px",
                boxShadow: "20px 60px 12px 2px rgba(30, 10, 10, 0.4)",
              }}
              src={image.url}
            />
          ))}
        </Zoom>
      </div>
      {/* {property?.images.map((image: ResponseImageInfoType) => (
        <CardMedia
          component="img"
          height="200"
          image={image.url}
          alt={property.name}
        />
      ))} */}
    </div>
  );
};

export default DisplayPropertyDetails;
