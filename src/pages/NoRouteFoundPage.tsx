import React from "react";
import Lottie from "lottie-react";
import lotti404 from "../../public/lottie404.json";

function NoRouteFoundPage() {
  return (
    <div className="w-1/2 h-1/2">
      <Lottie animationData={lotti404} loop={true}></Lottie>
    </div>
  );
}

export default NoRouteFoundPage;
