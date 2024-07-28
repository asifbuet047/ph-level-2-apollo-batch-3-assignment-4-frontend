import Lottie from "lottie-react";
import lotti404 from "../../../public/lottie404.json";

function NoRouteFoundPage() {
  return (
    <div className="flex flex-col items-center">
      <Lottie
        animationData={lotti404}
        loop={true}
        className="w-1/3 h-1/2"
      ></Lottie>
    </div>
  );
}

export default NoRouteFoundPage;
