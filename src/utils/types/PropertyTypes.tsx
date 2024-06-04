import { CreateAmenityType } from "./AmenityTypes";
import { CreateFacilityType } from "./FacilityTypes";
import { CreateMealType } from "./MealTypes";

export type ImageCreationType = {
  publicId: string;
  propertyId: number | undefined;
};

export type PropertyCreationType = {
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
  userId: number | undefined;

  facilities: CreateFacilityType;
  amenities: CreateAmenityType;
  meals: CreateMealType;
};

export type ResponsePropertyType = {
  id: number;
};

export type ResponseAddPropertyType = {
  propertyDetails: ResponsePropertyType | null;
  error: string;
};
