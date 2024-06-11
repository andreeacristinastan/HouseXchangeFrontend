export type ResponseTripsType = {
  id: number;
  numberOfPersons: number;
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
};

export type TripInfo = {
  id: number;
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
};
export interface Trip {
  id: number;
  destination: string;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
}

export type PostTripType = {
  numberOfPersons: number;
  destination: string | undefined;
  minRange: number;
  maxRange: number;
  checkInDate: Date | null;
  checkOutDate: Date | null;
  userId: number | undefined;
  propertyId: number | undefined;
};

export type ResponseGetAllTripsType = {
  id: number;
  numberOfPersons: number;
  destination: string;
  minRange: number;
  maxRange: number;
  checkInDate: Date;
  checkOutDate: Date;
  userId: number;
  propertyId: number;
}[];
