import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { information } from "../utils/information";
import { useGetStripePaymentIntentQuery } from "../redux/api/allApiEndpoints";

function StripeCheckoutFormComponent({
  address: clientInfo,
  amount,
  currency,
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const { data: serverPaymentIntent, isSuccess } =
    useGetStripePaymentIntentQuery({ amount, currency }, {});
  console.log(serverPaymentIntent);
  const client_secret = serverPaymentIntent?.data.client_secret as string;
  console.log(client_secret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (stripe && elements) {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: clientInfo.name,
              address: {
                city: clientInfo.address.city,
                country: clientInfo.address.country,
                line1: clientInfo.address.line1,
                line2: clientInfo.address.line2,
                postal_code: clientInfo.address.postal_code,
              },
              phone: clientInfo.phone,
            },
          },
          return_url: information.redirect_url, // Replace with your own URL
        },
        clientSecret: client_secret,
      });

      if (paymentIntent) {
        console.log(paymentIntent);
      }
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        {isSuccess ? (
          <div>
            <PaymentElement />
            <Button variant="contained" type="submit">
              Pay Now
            </Button>
          </div>
        ) : (
          <div>
            <PaymentElement />
            <Button disabled variant="contained" type="submit">
              Pay Now
            </Button>
          </div>
        )}

        {errorMessage && <p>{errorMessage}</p>}
      </form>
    </div>
  );
}

export default StripeCheckoutFormComponent;
