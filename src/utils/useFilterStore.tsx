import { create } from "zustand";

import { SearchValuesType } from "./types/SearchTypes";

interface FilterStore {
  searchDetails: SearchValuesType;
  setSearchDetails: (name: string, value: string) => void;
  resetSearchDetails: () => void;
}

const useFilterStore = create<FilterStore>((set, get) => ({
  searchDetails: {
    destination: "",
    checkIn: "",
    checkOut: "",
    typeOfProperty: "",
  },
  setSearchDetails: (name: string, value: string) => {
    console.log("my value is:");
    console.log(value);

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
