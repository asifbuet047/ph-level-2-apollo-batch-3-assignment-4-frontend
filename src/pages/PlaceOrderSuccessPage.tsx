import React, { useEffect } from "react";
import Lottie from "react-lottie";
import successful from "../../public/successful.json";
import { useAppDispatch } from "../redux/hooks";
import { clearCart } from "../redux/features/cartSlice";

function PlaceOrderSuccessPage() {
  const dispatch = useAppDispatch();
  dispatch(clearCart());
  return (
    <div>
      <Lottie options={{ animationData: successful }}></Lottie>
    </div>
  );
}

export default PlaceOrderSuccessPage;
