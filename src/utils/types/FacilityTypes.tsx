import { ResponsePropertyInfoType } from "./PropertyTypes";

export type CreateFacilityType = {
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  // propertyId: number;
};

export type ResponseFacilityType = {
  id: number;
  towel: boolean;
  balcony: boolean;
  airConditioning: boolean;
  tv: boolean;
  propertyInfo: ResponsePropertyInfoType;
};
