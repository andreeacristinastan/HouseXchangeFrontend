import { create } from "zustand";

import { SearchValuesType } from "./types/SearchTypes";
import { convertStringToDate } from "./convertStringToDate";
import { ResponseImageSearch } from "./types/ImageTypes";

interface FilterStore {
  searchDetails: SearchValuesType;
  setSearchDetails: (name: string, value: string | ResponseImageSearch) => void;
  resetSearchDetails: () => void;
  error: string;
  setError: (error: string) => void;
}

const useFilterStore = create<FilterStore>((set, get) => ({
  searchDetails: {
    destination: "",
    checkIn: "",
    checkOut: "",
    typeOfProperty: "",
    similarProperties: [],
  },
  error: "",
  setError: (error: string) => {
    set({ error });
  },
  setSearchDetails: (name: string, value: string | ResponseImageSearch) => {
    // console.log("my value is:");
    // console.log(value);
    if (typeof value === "string") {
      if (name === "checkIn" && get().searchDetails.checkOut.length !== 0) {
        const filteredCheckIn = convertStringToDate(value);
        const filteredCheckOut = convertStringToDate(
          get().searchDetails.checkOut
        );

        if (filteredCheckIn > filteredCheckOut) {
          get().setError("Check-in date cannot be after check-out date.");
          return;
        }
      }

      if (name === "checkOut" && get().searchDetails.checkIn.length !== 0) {
        const filteredCheckIn = convertStringToDate(
          get().searchDetails.checkIn
        );
        const filteredCheckOut = convertStringToDate(value);

        // console.log(filteredCheckIn);

        // console.log("vs.");

        // console.log(filteredCheckOut);

        if (filteredCheckIn > filteredCheckOut) {
          get().setError("Check-out date cannot be before check-in date.");
          return;
        }
      }
    }

    set({ searchDetails: { ...get().searchDetails, [name]: value } });
  },
  resetSearchDetails: () => {
    set({
      searchDetails: {
        destination: "",
        checkIn: "",
        checkOut: "",
        typeOfProperty: "",
        similarProperties: [],
      },
    });
  },
}));

export { useFilterStore };
