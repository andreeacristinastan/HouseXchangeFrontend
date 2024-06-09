export type CreateAvailabilityType = {
  startDate: string | undefined;
  endDate: string | undefined;
  userId: number | undefined;
  propertyId: number | undefined;
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
