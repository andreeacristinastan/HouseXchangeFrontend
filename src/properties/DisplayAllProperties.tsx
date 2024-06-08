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
import { SearchValuesType } from "../utils/types/SearchTypes";
import { useFilterStore } from "../utils/useFilterStore";
import {
  Availability,
  ResponseAllAvailabilitiesType,
} from "../utils/types/AvailabilityTypes";
import { convertStringToDate } from "../utils/convertStringToDate";

const DisplayAllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [propertiesAll, setPropertiesAll] = useState<Property[]>([]);
  const [defaultImageId, setDefaultImageId] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [newPriceRange, setNewPriceRange] = useState<number[]>([]);
  const filters = useFilterStore((state) => state.searchDetails);
  const setFilters = useFilterStore((state) => state.setSearchDetails);
  const [isFiltered, setIsFiltered] = useState(false);

  const handleChangePriceRange = (selectedPriceRange: number[]) => {
    setNewPriceRange(selectedPriceRange);
  };

  // const handleChangeSearchDetails = ()

  const filterFunction = (property: Property) => {
    // console.log(filters.typeOfProperty);
    if (
      filters.typeOfProperty.length !== 0 &&
      property.propertyType !== filters.typeOfProperty.toLowerCase()
    ) {
      return false;
    }

    if (newPriceRange[0] !== 500 || newPriceRange[1] !== 1000) {
      if (
        property.price < newPriceRange[0] ||
        property.price > newPriceRange[1]
      ) {
        return false;
      }
    }

    if (
      filters.destination.length !== 0 &&
      filters.destination !== property.city
    ) {
      return false;
    }

    // for (let a of availabilities) {
    //   if (property.id === a.propertyId) {
    //     // const propertyAvailabilityStart = new Date(a.startDate);
    //     // const propertyAvailabilityEnd = new Date(a.endDate);
    //     // const userSelectedDateStart = new Date(filters.checkIn);
    //     // const userSelectedDateEnd = new Date(filters.checkOut);

    //     //startDate
    //     const propertyStart = a.startDate.split("/");
    //     const propertyStartYear = parseInt(propertyStart[2]);
    //     const propertyStartMonth = parseInt(propertyStart[0]);
    //     const propertyStartDay = parseInt(propertyStart[1]);
    //     const propertyFinalDateStart = new Date(
    //       propertyStartYear,
    //       propertyStartMonth,
    //       propertyStartDay
    //     );

    //     //endDate
    //     const propertyEnd = a.endDate.split("/");
    //     const propertyEndYear = parseInt(propertyEnd[2]);
    //     const propertyEndMonth = parseInt(propertyEnd[0]);
    //     const propertyEndDay = parseInt(propertyEnd[1]);
    //     const propertyFinalDateEnd = new Date(
    //       propertyEndYear,
    //       propertyEndMonth,
    //       propertyEndDay
    //     );

    //     //checkIn
    //     const userStart = filters.checkIn.split("/");
    //     const userStartYear = parseInt(userStart[2]);
    //     const userStartMonth = parseInt(userStart[0]);
    //     const userStartDay = parseInt(userStart[1]);
    //     const userFinalDateStart = new Date(
    //       userStartYear,
    //       userStartMonth,
    //       userStartDay
    //     );

    //     //checkOut
    //     const userEnd = filters.checkOut.split("/");
    //     const userEndYear = parseInt(userEnd[2]);
    //     const userEndMonth = parseInt(userEnd[0]);
    //     const userEndDay = parseInt(userEnd[1]);
    //     const userFinalDateEnd = new Date(
    //       userEndYear,
    //       userEndMonth,
    //       userEndDay
    //     );

    //     //  if(userStartYear >= propertyStartYear && userStartMonth)

    //     // console.log("===================================");
    //     // console.log("property start:");

    //     // console.log(propertyFinalDateStart);
    //     // console.log("property end:");

    //     // console.log(propertyFinalDateEnd);
    //     // console.log("user start:");

    //     // console.log(userFinalDateStart);
    //     // console.log("user end:");

    //     // console.log(userFinalDateEnd);

    //     if (
    //       propertyFinalDateStart.getTime() <= userFinalDateStart.getTime() &&
    //       propertyFinalDateEnd.getTime() >= userFinalDateEnd.getTime()
    //     ) {
    //       // console.log("userul poate rezerva");
    //       return true;
    //     }
    //     // console.log(propertyAvailabilityStart.getMonth());
    //     // console.log(propertyAvailabilityEnd.getDate());
    //     // console.log(userSelectedDateStart.getDate());
    //     // console.log(userSelectedDateEnd.getDate());
    //     // console.log(a.startDate);
    //     // console.log(a.endDate);
    //     // console.log(userSelectedDateStart.getDate());
    //     // console.log(userSelectedDateEnd.getDate());

    //     // if(propertyAvailabilityStart.getFullYear < userSelectedDateStart.getFullYear)
    //   }
    // }

    // If the property passed all filters, include it in the new array
    return true;
  };

  const filterByDates = (property: Property) => {
    console.log("Availabs:");

    if (filters.checkIn.length === 0 || filters.checkOut.length === 0) {
      return true;
    }

    for (const a of availabilities) {
      const convertedStartDate = convertStringToDate(a.startDate);
      const convertedEndDate = convertStringToDate(a.endDate);
      const filteredCheckIn = convertStringToDate(filters.checkIn);
      const filteredCheckOut = convertStringToDate(filters.checkOut);

      console.log("start date db:");
      console.log(convertedStartDate);

      console.log("vs.");

      console.log(filteredCheckIn);

      console.log("end date db:");
      console.log(convertedEndDate);

      console.log("vs.");

      console.log(filteredCheckOut);

      if (
        a.propertyId === property.id &&
        filteredCheckIn >= convertedStartDate &&
        filteredCheckOut <= convertedEndDate
      ) {
        return true;
      }
    }

    // for(a of availabilities) {
    //   if (propertyFinalDateStart.getTime() <= userFinalDateStart.getTime() && propertyFinalDateEnd.getTime() >= userFinalDateEnd.getTime()) {
    //     // console.log("userul poate rezerva");
    //     return true;
    //   }
    // }
  };

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
    getAllProperties();
    getAllAvailabilities();
    console.log("========================filters are:");

    console.log(filters);
    console.log("========================prices are:");

    console.log(newPriceRange);
  }, []);

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

  const getAllProperties = async () => {
    const res = await fetch(`http://localhost:8080/api/properties-all`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      // console.log(await res);

      return;
    }

    const data: ResponseGetAllPropertiesType = await res.json();
    // setTotalPages(data.totalPages);
    // const totalProperties: ResponseGetAllPropertiesType = data.content;
    setPropertiesAll(
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
          <PriceRangeSlider handleChangePriceRange={handleChangePriceRange} />
          <SearchProperties
            textBtn={false}
            setNewPriceRange={setNewPriceRange}
            // handleSearchDetails={handleSearchDetails}
          />
        </div>
      </div>
      <div className="all-properties-box">
        {propertiesAll
          .filter(filterFunction)
          .filter(filterByDates)
          .slice((page - 1) * 8, page * 8)
          .map((property) => (
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

              color: "#fff",
            },
            "& .MuiPaginationItem-page.Mui-selected": {
              backgroundColor: "#87a9b0",
            },
          }}
        />
      </div>
    </div>
  );
};

export default DisplayAllProperties;
