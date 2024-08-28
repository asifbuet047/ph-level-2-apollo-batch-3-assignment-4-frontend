import React from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { useNavigate } from "react-router-dom";

function CheckoutButtonComponent() {
  const buttonEnable = useAppSelector((state) => state.general.general) as {
    internet: boolean;
    checkoutButton: boolean;
  };
  const navigate = useNavigate();

  return (
    <div className="flex flex-row justify-center items-center">
      <Button
        disabled={buttonEnable.checkoutButton ? false : true}
        variant="contained"
        className="w-full"
        sx={{ backgroundColor: "#AF161B" }}
        onClick={() => navigate("/checkout")}
      >
        Checkout
      </Button>
    </div>
  );
}

export default CheckoutButtonComponent;
