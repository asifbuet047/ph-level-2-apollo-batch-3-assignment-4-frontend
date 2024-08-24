import { Button, ButtonGroup } from "@mui/material";
import React, { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TCartData } from "../types/AllTypes";
import { removeFromCart, updateCart } from "../redux/features/cartSlice";

function ProductQuantityButtonComponent({ id }) {
  const cartDetails = useAppSelector(
    (state) => state.cart.items
  ) as TCartData[];
  const dispatch = useAppDispatch();
  const productId: string = id;
  const currentProduct = cartDetails.find(
    (cart) => cart.id === productId
  ) as TCartData;

  useEffect(() => {
    console.log("Mounted and rendered");
  }, []);

  console.log("Re-rendered");

  const onIncreaseQuantity = () => {
    dispatch(updateCart(currentProduct));
  };

  const onDecreaseQuantity = () => {
    const cart = cartDetails.find((each) => each.id === productId) as TCartData;
    dispatch(removeFromCart(cart.id));
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonGroup variant="outlined">
        <Button endIcon={<RemoveIcon />} onClick={onDecreaseQuantity}></Button>
        <Button
          disableFocusRipple
          disableTouchRipple
          disableElevation
          disableRipple
        >
          {currentProduct.quantity}
        </Button>
        <Button startIcon={<AddIcon />} onClick={onIncreaseQuantity}></Button>
      </ButtonGroup>
    </div>
  );
}

export default ProductQuantityButtonComponent;
