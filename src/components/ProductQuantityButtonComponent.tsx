import { Button, ButtonGroup } from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { TCartData, TProduct } from "../types/AllTypes";
import {
  increaseQuantity,
  decreaseQuantity,
} from "../redux/features/cartSlice";
import { toast } from "react-toastify";

function ProductQuantityButtonComponent({ id }) {
  const cartDetails = useAppSelector(
    (state) => state.cart.items
  ) as TCartData[];
  const allproducts = useAppSelector(
    (state) => state.products.products
  ) as TProduct[];
  const dispatch = useAppDispatch();
  const productId: string = id;
  const currentProductsCart = cartDetails.find(
    (cart) => cart.id === productId
  ) as TCartData;
  const currentProduct = allproducts.find(
    (product) => product._id === productId
  ) as TProduct;

  const onIncreaseQuantity = () => {
    if (currentProductsCart.quantity < currentProduct.quantity) {
      dispatch(increaseQuantity(currentProductsCart.id));
      toast.success(`${currentProductsCart.name} quantity increased into cart`);
    } else {
      toast.warn(`${currentProductsCart.name} is no stock in our inventory`);
    }
  };

  const onDecreaseQuantity = () => {
    dispatch(decreaseQuantity(currentProductsCart.id));
  };

  return (
    <div className="flex flex-row justify-center items-center">
      <ButtonGroup variant="outlined">
        <Button
          disabled={currentProductsCart.quantity > 1 ? false : true}
          endIcon={<RemoveIcon />}
          onClick={onDecreaseQuantity}
        ></Button>
        <Button
          disableFocusRipple
          disableTouchRipple
          disableElevation
          disableRipple
        >
          {currentProductsCart.quantity}
        </Button>
        <Button startIcon={<AddIcon />} onClick={onIncreaseQuantity}></Button>
      </ButtonGroup>
    </div>
  );
}

export default ProductQuantityButtonComponent;
