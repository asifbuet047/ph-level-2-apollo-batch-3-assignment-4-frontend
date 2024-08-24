import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { TCartData } from "../types/AllTypes";
import ProductQuantityButtonComponent from "../components/ProductQuantityButtonComponent";

function CartPage() {
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  const subTotal = cart
    .map((each) => each.price * each.quantity)
    .reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  const grandTotal = subTotal * 0.15 + subTotal;


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
                      <p className="text-black font-bold text-xl">Unit Price</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-black font-bold text-xl">Quantity</p>
                    </TableCell>
                    <TableCell>
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
                      <p className="text-black font-semibold text-lg">
                        {subTotal}
                      </p>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <p className="text-black font-semibold text-lg">VAT</p>
                    </TableCell>
                    <TableCell>
                      <p className="text-black font-semibold text-lg">
                        {subTotal * 0.15}
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
                      <p className="text-black font-semibold text-lg">
                        {grandTotal}
                      </p>
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
}

export default CartPage;
