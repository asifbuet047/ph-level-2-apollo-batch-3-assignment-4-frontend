import React, { useEffect, useState } from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import StripeCheckoutFormComponent from "../components/StripeCheckoutFormComponent";
import { Button } from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { TCartData } from "../types/AllTypes";

const stripePromise = loadStripe(
  "pk_test_51OI5ZgDlSwco0gOTuyOoqoUItNwS9Axa6Ky0lvqURYC1iBYGTf3IBcPPHCdUSZXvllzwgR6gbz8nXVMWknvsJfN7005e11JoeJ"
);

function CheckoutPage() {
  const [paymentPage, setPaymentPage] = useState<boolean>(false);
  const [stripeAddress, setStripeAddress] = useState(null);
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  const subTotal = cart
    .map((each) => each.price * each.quantity)
    .reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  const grandTotal = (subTotal * 0.15 + subTotal) * 100;

  return (
    <div>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: grandTotal,
          currency: "usd",
          appearance: { theme: "stripe" },
        }}
      >
        {!paymentPage ? (
          <div className="flex flex-col justify-center ml-5 mr-5 p-2 items-center border-2 rounded-md">
            <AddressElement
              className="ml-10 mr-10"
              options={{
                mode: "shipping",
                display: { name: "split" },
                fields: { phone: "always" },
                defaultValues: {
                  firstName: "Your first name",
                  lastName: "Your last name",
                  address: { country: "bd", city: "Example: Dhaka" },
                  phone: "01111111111",
                },
              }}
              onChange={(event) => setStripeAddress(event.value)}
            />
            <div className="mt-5 mb-5 flex flex-row justify-center">
              <Button variant="contained" onClick={() => setPaymentPage(true)}>
                Proced to payment
              </Button>
            </div>
          </div>
        ) : (
          <StripeCheckoutFormComponent
            address={stripeAddress}
            amount={grandTotal}
            currency={"usd"}
          />
        )}
      </Elements>
    </div>
  );
}

export default CheckoutPage;
