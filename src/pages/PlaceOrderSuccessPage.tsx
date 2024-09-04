import React, { useEffect } from "react";
import Lottie from "react-lottie";
import successful from "../../public/successful.json";

function PlaceOrderSuccessPage() {
  return (
    <div>
      <Lottie options={{ animationData: successful }}></Lottie>
    </div>
  );
}

export default PlaceOrderSuccessPage;
