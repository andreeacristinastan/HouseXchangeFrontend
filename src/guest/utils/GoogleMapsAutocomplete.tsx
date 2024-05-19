import React, { useState } from "react";
import { createRoot } from "react-dom/client";

import MapHandler from "./MapHandler";
import { CustomMapControl } from "./CustomMapControl";

const API_KEY = import.meta.env.MAPS_API_KEY;

export type AutocompleteMode = { id: string; label: string };

const autocompleteModes: Array<AutocompleteMode> = [
  { id: "classic", label: "Google Autocomplete Widget" },
  { id: "custom", label: "Custom Build" },
  { id: "custom-hybrid", label: "Custom w/ Select Widget" },
];

const GoogleMapsAutocomplete = () => {
  //   const [selectedAutocompleteMode, setSelectedAutocompleteMode] =
  //     useState<AutocompleteMode>(autocompleteModes[0]);

  const [selectedPlace, setSelectedPlace] =
    useState<google.maps.places.PlaceResult | null>(null);
  return (
    <></>
    //     <APIProvider apiKey={API_KEY}>
    //       <Map
    //         defaultZoom={3}
    //         defaultCenter={{ lat: 22.54992, lng: 0 }}
    //         gestureHandling={"greedy"}
    //         disableDefaultUI={true}
    //       />

    //       <CustomMapControl
    //         controlPosition={ControlPosition.TOP}
    //         selectedAutocompleteMode={autocompleteModes[2]}
    //         onPlaceSelect={setSelectedPlace}
    //       />

    //       {/* <ControlPanel
    //         autocompleteModes={autocompleteModes}
    //         selectedAutocompleteMode={selectedAutocompleteMode}
    //         onAutocompleteModeChange={setSelectedAutocompleteMode}
    //       /> */}

    //       <MapHandler place={selectedPlace} />
    //     </APIProvider>
  );
};

export default GoogleMapsAutocomplete;
