import React, { useEffect, useState } from "react";

interface Property {
  id: number;
  name: string;
  propertyType: string;
  bathrooms: number;
  rooms: number;
  country: string;
  city: string;
  address: string;
}

type responsePropertyInfo = {
  id: number;
  name: string;
};

type responseFacility = {
  id: number;
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  propertyInfo: responsePropertyInfo;
};

type responseAmenity = {
  id: number;
  gym: boolean;
  swimmingPool: boolean;
  garden: boolean;
  parking: boolean;
  wifi: boolean;
  bikes: boolean;
  kidsZone: boolean;
  petsFriendly: boolean;
  disabilitiesFriendly: boolean;
};

type responseMeal = {
  id: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};

type responseTrips = {
  id: number;
  numberOfPersons: number;
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
};

type responseGetAllProperties = {
  id: number;
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
  userId: number;
  trips: responseTrips;
  mealInfo: responseMeal;
  amenityInfo: responseAmenity;
  facilityDto: responseFacility;
}[];

const DisplayAllProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  const getProperties = async () => {
    const res = await fetch(
      `http://localhost:8080/api/properties?page=${0}&size=${8}`,
      {
        method: "GET",
      }
    );
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: responseGetAllProperties = await res.json();
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
      }))
    );

    console.log(data);
  };

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-4">
      {properties.map((property) => (
        <div key={property.id}>
          <PropertyCard property={property} />
        </div>
      ))}
    </div>
  );
};

export default DisplayAllProperties;
