import { CreateAmenityType, ResponseAmenityType } from "./AmenityTypes";
import { CreateFacilityType, ResponseFacilityType } from "./FacilityTypes";
import { ResponseImageInfoType } from "./ImageTypes";
import { CreateMealType, ResponseMealType } from "./MealTypes";
import { ResponseTripsType } from "./TripTypes";

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

export type ResponseGetAllPropertiesType = {
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
  trips: ResponseTripsType[];
  images: ResponseImageInfoType[];
  mealInfo: ResponseMealType;
  amenityInfo: ResponseAmenityType;
  facilityDto: ResponseFacilityType;
}[];

export type ResponseGetPropertyByIdType = {
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
  trips: ResponseTripsType[];
  images: ResponseImageInfoType[];
  mealInfo: ResponseMealType;
  amenityInfo: ResponseAmenityType;
  facilityDto: ResponseFacilityType;
};

export type UpdateUserPropertyType = {
  name: string | undefined;
  propertyDescription: string | undefined;
  numberOfBathrooms: number;
  numberOfRooms: number;
  price: number | undefined;
  userId: number | undefined;
  propertyId: number | undefined;
  facilities: CreateFacilityType;
  amenities: CreateAmenityType;
};

export interface Property {
  id: number;
  name: string;
  propertyDescription: string;
  propertyType: string;
  bathrooms: number;
  rooms: number;
  country: string;
  city: string;
  address: string;
  price: number;
  images: ResponseImageInfoType[];
  trips: ResponseTripsType[];
  meals: ResponseMealType;
  facilities: ResponseFacilityType;
  amenities: ResponseAmenityType;
}
export interface PropertyMaps {
  id: number;
  name: string;
  address: string;
  country: string;
  city: string;
  zipCode: number;
}

export interface PropertyImageSearch {
  id: number;
  images: ResponseImageInfoType[];
}

export type ResponsePropertyInfoType = {
  id: number;
  name: string;
};

export type PropertyInfoType = {
  id: number;
  name: string;
  address: string;
  country: string;
  city: string;
  zipCode: number;
}[];

export type PropertyInfosUserType = {
  id: number;
  city: string;
};
