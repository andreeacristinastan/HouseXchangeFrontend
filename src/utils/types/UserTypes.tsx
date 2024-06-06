import { ResponseGetAllProfileImageType } from "./ProfileImageTypes";
import { ResponsePropertyInfoType } from "./PropertyTypes";
import { TripInfo } from "./TripTypes";

export type LoginCredentialsType = {
  username: string;
  password: string;
};

export type RegisterCredentialsType = {
  role: string;
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  language: string;
  phoneNumber: number;
  prefixNumber: string;
};

export type UpdateUserValuesType = {
  email: string;
  // username: string;
  firstName: string;
  lastName: string;
  language: string;
};

export type LoginRespType = {
  jwt: string;
};

export type UserInfosType = {
  role: string;
  email: string;
  username: string;
  id: number;
  exp: number;
  iat: number;
};

export type EditUserType = {
  email: string;
  firstName: string;
  lastName: string;
  language: string;
};

export type userInfo = {
  id: number;
  role: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  language: string;
  phoneNumber: string;
  properties: ResponsePropertyInfoType[];
  tripInfoDto: TripInfo[];
  profileImage: ResponseGetAllProfileImageType;
};
