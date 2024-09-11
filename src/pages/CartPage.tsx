import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { TCartData } from "../types/AllTypes";
import DeleteIcon from "@mui/icons-material/Delete";
import ProductQuantityButtonComponent from "../components/ProductQuantityButtonComponent";
import { removeFromCart } from "../redux/features/cartSlice";
import CheckoutButtonComponent from "../components/CheckoutButtonComponent";
import { updateCheckoutButtonState } from "../redux/features/generalSlice";
import Lottie from "react-lottie";
import shopping_cart from "../../public/shopping_cart.json";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const subTotal = cart
    .map((each) => each.price * each.quantity)
    .reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  const grandTotal = subTotal * 0.15 + subTotal;

  const onProductRemovedFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  useEffect(() => {
    if (cart.length <= 0) {
      dispatch(updateCheckoutButtonState(false));
    }
  });

  if (cart.length > 0) {
    return (
      <div className="border-4 pt-4 pb-4">
        <div className="flex flex-col justify-center items-center ">
          <div className="flex flex-row justify-center ">
            <p className="text-6xl text-center p-5 font-bold text-black ">
              SHOPPING CART
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="cart">
                  <TableHead className="bg-[#F7F7F7]">
                    <TableRow>
                      <TableCell>
                        <p className="text-black font-bold text-xl">No</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-bold text-xl">Product</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-bold text-xl">
                          Unit Price
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-bold text-xl">Quantity</p>
                      </TableCell>
                      <TableCell colSpan={2}>
                        <p className="text-black font-bold text-xl">Subtotal</p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cart.map((each, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <p className="text-black font-semibold text-lg">
                            {index + 1}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-black font-semibold text-lg">
                            {each.name}
                          </p>
                        </TableCell>
                        <TableCell>
                          <p className="text-black font-semibold text-lg">
                            {each.price}
                          </p>
                        </TableCell>
                        <TableCell>
                          <ProductQuantityButtonComponent id={each.id} />
                        </TableCell>
                        <TableCell>
                          <p className="text-black font-semibold text-lg">
                            {each.price * each.quantity}
                          </p>
                        </TableCell>
                        <TableCell>
                          <Tooltip title="Remove from cart" placement="right">
                            <IconButton
                              aria-label="delete"
                              onClick={() => onProductRemovedFromCart(each.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="cart-total">
                  <TableHead className="bg-[#F7F7F7]">
                    <TableRow>
                      <TableCell colSpan={2}>
                        <p className="text-black font-bold text-xl">
                          Cart totals
                        </p>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <p className="text-black font-semibold text-lg">
                          Subtotal:
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-semibold text-lg text-right">
                          {subTotal.toFixed(2)}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p className="text-black font-semibold text-lg">VAT</p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-semibold text-lg text-right">
                          {(subTotal * 0.15).toFixed(2)}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <p className="text-black font-semibold text-lg">
                          Grand total
                        </p>
                      </TableCell>
                      <TableCell>
                        <p className="text-black font-semibold text-lg text-right">
                          {grandTotal.toFixed(2)}
                        </p>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={2}>
                        <div>
                          <CheckoutButtonComponent />
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col justify-center items-center mt-2 mb-2">
        <div className="flex flex-row justify-center">
          <p className="text-6xl text-center p-5 font-bold text-black ">
            SHOPPING CART
          </p>
        </div>
        <div className="w-1/5 mb-5">
          <Lottie options={{ animationData: shopping_cart }}></Lottie>
        </div>
        <Button variant="contained" onClick={() => navigate("/products")}>
          Buy PRODUCT
        </Button>
      </div>
    );
  }
}

export default CartPage;
