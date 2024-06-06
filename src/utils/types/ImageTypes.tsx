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
