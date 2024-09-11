import Lottie from "react-lottie";
import successful from "../../public/successful.json";
import man from "../../public/man_with_no_sign.json";
import { useAppDispatch } from "../redux/hooks";
import { clearCart } from "../redux/features/cartSlice";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PlaceOrderSuccessPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  if (location.state?.success) {
    toast.success("Your order successfully placed");
    dispatch(clearCart());
    return (
      <div className="flex flex-col justify-center items-center mt-5 mb-5">
        <div className="w-1/3 mb-5">
          <Lottie options={{ animationData: successful }}></Lottie>
        </div>
        <Button variant="contained" onClick={() => navigate("/")}>
          GO to HOME
        </Button>
      </div>
    );
  } else {
    toast.warn("You should not here right now");
    return (
      <div className="flex flex-col justify-center items-center mt-5 mb-5">
        <div className="w-1/3 mb-5">
          <Lottie options={{ animationData: man }}></Lottie>
        </div>
        <Button variant="contained" onClick={() => navigate("/")}>
          GO to HOME
        </Button>
      </div>
    );
  }
}

export default PlaceOrderSuccessPage;
