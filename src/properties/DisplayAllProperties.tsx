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

const DisplayAllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
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

    if (
      property.price < newPriceRange[0] ||
      property.price > newPriceRange[1]
    ) {
      return false;
    }

    if (
      filters.destination.length !== 0 &&
      filters.destination !== property.city
    ) {
      return false;
    }

    // If the property passed all filters, include it in the new array
    return true;
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
  }, []);

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
