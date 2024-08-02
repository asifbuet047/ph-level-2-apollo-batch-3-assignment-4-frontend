import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface TProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  rating: number;
  price: number;
  product_image_file: string;
}

export interface TInitialState {
  products: TProduct[];
}

export interface TFilterData {
  name: string;
  quantity: number;
}

export interface TFilterState {
  filters: TFilterData[];
}

export interface TGenericSuccessfulResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type TReduxResponse<T> = TGenericSuccessfulResponse<T> & BaseQueryApi;
