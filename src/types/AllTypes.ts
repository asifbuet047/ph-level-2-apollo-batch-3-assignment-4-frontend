import { BaseQueryApi } from "@reduxjs/toolkit/query";

export interface TProduct {
  name: string;
  description: string;
  category: string;
  brand: string;
  quantity: number;
  rating: number;
}

export interface TInitialState {
  value: number;
}

export interface TGenericSuccessfulResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export type TReduxResponse<T> = TGenericSuccessfulResponse<T> & BaseQueryApi;
