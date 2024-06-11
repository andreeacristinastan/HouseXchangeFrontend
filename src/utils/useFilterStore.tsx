import { create } from "zustand";

import { SearchValuesType } from "./types/SearchTypes";
import { convertStringToDate } from "./convertStringToDate";

interface FilterStore {
  searchDetails: SearchValuesType;
  setSearchDetails: (name: string, value: string) => void;
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
  },
  error: "",
  setError: (error: string) => {
    set({ error });
  },
  setSearchDetails: (name: string, value: string) => {
    console.log("my value is:");
    console.log(value);

    // const convertedStartDate = convertStringToDate(a.startDate);
    // const convertedEndDate = convertStringToDate(a.endDate);
    // const filteredCheckIn = convertStringToDate(filters.checkIn);
    // const filteredCheckOut = convertStringToDate(filters.checkOut);

    // console.log("start date db:");
    // console.log(convertedStartDate);

    // console.log("vs.");

    // console.log(filteredCheckIn);

    // console.log("end date db:");
    // console.log(convertedEndDate);

    // console.log("vs.");

    // console.log(filteredCheckOut);

    if (name === "checkIn" && get().searchDetails.checkOut.length !== 0) {
      const filteredCheckIn = convertStringToDate(value);
      const filteredCheckOut = convertStringToDate(
        get().searchDetails.checkOut
      );

      // console.log(filteredCheckIn);

      // // console.log("end date db:");
      // // console.log(convertedEndDate);

      // console.log("vs.");

      // console.log(filteredCheckOut);

      if (filteredCheckIn > filteredCheckOut) {
        // console.log("SUUUUUUUUUU vs.");

        get().setError("Check-in date cannot be after check-out date.");
        return;
      }
    }

    if (name === "checkOut" && get().searchDetails.checkIn.length !== 0) {
      const filteredCheckIn = convertStringToDate(get().searchDetails.checkIn);
      const filteredCheckOut = convertStringToDate(value);

      console.log(filteredCheckIn);

      // console.log("end date db:");
      // console.log(convertedEndDate);

      console.log("vs.");

      console.log(filteredCheckOut);

      if (filteredCheckIn > filteredCheckOut) {
        console.log("SUUUUUUUUUU vs.");

        get().setError("Check-out date cannot be before check-in date.");
        return;
      }
    }

    // const mySearchDetails = get().searchDetails;
    set({ searchDetails: { ...get().searchDetails, [name]: value } });
  },
  resetSearchDetails: () => {
    set({
      searchDetails: {
        destination: "",
        checkIn: "",
        checkOut: "",
        typeOfProperty: "",
      },
    });
  },
}));

export { useFilterStore };
