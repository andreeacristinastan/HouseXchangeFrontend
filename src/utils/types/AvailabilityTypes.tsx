export type CreateAvailabilityType = {
  startDate: string;
  endDate: string;
  userId: number | undefined;
  propertyId: number;
};

export type ResponseAllAvailabilitiesType = {
  id: number;
  startDate: string;
  endDate: string;
  userId: number;
  propertyId: number;
}[];

export interface Availability {
  id: number;
  startDate: string;
  endDate: string;
  userId: number;
  propertyId: number;
}
