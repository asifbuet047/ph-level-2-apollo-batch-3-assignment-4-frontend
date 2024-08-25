import React from "react";
import { Button } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

function CheckoutButtonComponent() {
  const buttonEnable = useAppSelector((state) => state.general.general) as {
    internet: boolean;
    checkoutButton: boolean;
  };
  console.log(buttonEnable);

  return (
    <div className="flex flex-row justify-center items-center">
      <Button
        disabled={buttonEnable.checkoutButton ? false : true}
        variant="contained"
        className="w-full"
        sx={{ backgroundColor: "#AF161B" }}
      >
        Checkout
      </Button>
    </div>
  );
}

export default CheckoutButtonComponent;
