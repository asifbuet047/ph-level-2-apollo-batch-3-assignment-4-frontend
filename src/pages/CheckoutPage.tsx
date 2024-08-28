import React from "react";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckoutFormComponent from "../components/StripeCheckoutFormComponent";

const stripePromise = loadStripe(
  "pk_test_51OI5ZgDlSwco0gOTuyOoqoUItNwS9Axa6Ky0lvqURYC1iBYGTf3IBcPPHCdUSZXvllzwgR6gbz8nXVMWknvsJfN7005e11JoeJ"
);

function CheckoutPage() {
  const options: StripeElementsOptions = {
    mode: "payment",
    amount: 1000,
    currency: "usd",
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <StripeCheckoutFormComponent />
      </Elements>
    </div>
  );
}

export default CheckoutPage;
