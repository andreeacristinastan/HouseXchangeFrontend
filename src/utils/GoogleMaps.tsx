/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useEffect, useState } from "react";
import { setKey, fromAddress } from "react-geocode";
const API_KEY = import.meta.env.VITE_MAPS_API_KEY;

import { Map, useMap, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

import { PropertyInfoType, PropertyMaps } from "./types/PropertyTypes";
import { useNavigate } from "react-router-dom";

type Poi = { key: number; location: google.maps.LatLngLiteral };

const GoogleMaps = () => {
  const [propertiesAll, setPropertiesAll] = useState<PropertyMaps[]>([]);
  const [locations, setLocations] = useState<Poi[]>([]);

  const geocodeLocations = async (propertiesAll: PropertyInfoType) => {
    const resultLocations: Poi[] = [];

    for (const locationObj of propertiesAll) {
      const { address } = locationObj;
      fromAddress(address)
        .then(({ results }) => {
          const { lat, lng } = results[0].geometry.location;
          const location = {
            key: locationObj.id,
            location: { lat, lng },
          };

          setLocations((prevLocations) => [...prevLocations, location]);
          console.log(lat, lng, resultLocations);
        })
        .catch(console.error);
    }
  };

  const getAllProperties = async () => {
    const res = await fetch(`http://localhost:8080/api/properties-all`, {
      method: "GET",
    });
    if (!res.ok) {
      console.log("Eroare cand iei proprietati");
      return;
    }

    const data: PropertyInfoType = await res.json();
    setPropertiesAll(
      data.map((property) => ({
        id: property.id,
        name: property.name,
        address: property.address,
        city: property.city,
        country: property.country,
        zipCode: property.zipCode,
      }))
    );
  };
  setKey(API_KEY);
  useEffect(() => {
    getAllProperties();
  }, []);

  useEffect(() => {
    async function fetchData() {
      await geocodeLocations(propertiesAll);
    }
    fetchData();
    console.log(locations);
  }, [propertiesAll]);

  useEffect(() => {
    console.log(locations);
  }, [locations]);
  return (
    <Map
      defaultZoom={5}
      defaultCenter={{ lat: 49.150982, lng: 19.974112 }}
      mapId="da37f3254c6a6d1c"
    >
      <PoiMarkers pois={locations} />
    </Map>
  );
};

const PoiMarkers = (props: { pois: Poi[] }) => {
  const navigate = useNavigate();

  const map = useMap();
  const handleClick = (id: number) => (ev: google.maps.MapMouseEvent) => {
    if (!map) return;
    if (!ev.latLng) return;
    navigate(`/property-details/${id}`);
  };

  return (
    <>
      {props.pois.map((poi: Poi) => (
        <AdvancedMarker
          key={poi.key}
          position={poi.location}
          clickable={true}
          onClick={handleClick(poi.key)}
        >
          <Pin background={"red"} glyphColor={"#000"} borderColor={"#000"} />
        </AdvancedMarker>
      ))}
    </>
  );
};

export default GoogleMaps;
