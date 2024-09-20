import Lottie from "react-lottie";
import lotti404 from "../../../public/lottie404.json";

function NoRouteFoundPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <Lottie options={{ animationData: lotti404 }}></Lottie>
    </div>
  );
}

export default NoRouteFoundPage;
