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
