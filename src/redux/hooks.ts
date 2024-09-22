import { useDispatch, useSelector } from "react-redux";
import { ReduxStore } from "./store";

export const useAppDispatch =
  useDispatch.withTypes<typeof ReduxStore.store.dispatch>();
export const useAppSelector =
  useSelector.withTypes<ReturnType<typeof ReduxStore.store.getState>>();
