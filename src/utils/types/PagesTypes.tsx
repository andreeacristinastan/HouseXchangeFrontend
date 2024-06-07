import { ResponseGetAllPropertiesType } from "./PropertyTypes";
export type SortType = {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}[];

export type PageableType = {
  offset: number;
  sort: SortType;
  pageSize: number;
  pageNumber: number;
  paged: boolean;
  unpaged: boolean;
};

export type ResponsePropertiesPagesType = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: ResponseGetAllPropertiesType;
  number: number;
  sort: SortType;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  pageable: PageableType;
  empty: boolean;
};
