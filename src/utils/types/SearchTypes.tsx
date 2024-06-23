import { ResponseImageSearch } from "./ImageTypes";

export type SearchValuesType = {
  destination: string;
  checkIn: string;
  checkOut: string;
  typeOfProperty: string;
  similarProperties: ResponseImageSearch;

  //   priceRange: number[];
};
