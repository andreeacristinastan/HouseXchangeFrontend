export type CreateMealType = {
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
  // propertyId: number;
};

export type ResponseMealType = {
  id: number;
  breakfast: boolean;
  lunch: boolean;
  dinner: boolean;
};
