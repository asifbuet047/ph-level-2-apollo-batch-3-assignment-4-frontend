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
  filter_name: string;
  filter_value: string | number;
  filter_quantity: number;
  filter_checked: boolean;
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

export interface TDiscount {
  title: string;
  product_name: string;
  product_price: number;
  product_discount: number;
  productId: string;
}

export interface TGeneralState {
  general: {
    internet: boolean;
    checkoutButton: boolean;
  };
}

export interface TCartData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface TCartState {
  items: TCartData[];
}

export interface TPaymentIntentParams {
  amount: number;
  currency: string;
}

export interface TOrder {
  client_secret: string | null;
  client_name: string;
  client_phone_number: string;
  client_country: string;
  payment_status: "paid" | "cod";
  product_id: string[];
  product_name: string[];
  product_quantity: number[];
  product_price: number[];
}

export type TReduxResponse<T> = TGenericSuccessfulResponse<T> & BaseQueryApi;
