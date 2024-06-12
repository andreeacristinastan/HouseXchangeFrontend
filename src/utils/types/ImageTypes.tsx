import { PropertyImageSearch } from "./PropertyTypes";

export type ResponseImageInfoType = {
  id: number;
  url: string;
};

export type ImageCreationType = {
  url: string;
  propertyId: number | undefined;
};

export type ResponseGetAllImagesType = {
  id: number;
  url: string;
  propertyId: number | undefined;
}[];

export type ImageSearchType = {
  properties: PropertyImageSearch[];
  to_be_compared_img: string;
};

export type ResponseImageSearch = {
  property_id: number;
  url: string;
  similarity_score: number;
};
