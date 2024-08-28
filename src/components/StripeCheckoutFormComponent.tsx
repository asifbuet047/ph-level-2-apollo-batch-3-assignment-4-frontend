import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useGetStripeSecretKeyQuery } from "../redux/api/allApiEndpoints";
import { Button } from "@mui/material";

function StripeCheckoutFormComponent() {
  const stripe = useStripe();
  const elements = useElements();
  const { data, isSuccess } = useGetStripeSecretKeyQuery([], {});
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);

  console.log(data.secret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }
  };

  return (
    <div className="p-2">
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <Button
          variant="contained"
          type="submit"
          disabled={!stripe || processing || succeeded}
        >
          Pay Now
        </Button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}

export default StripeCheckoutFormComponent;
