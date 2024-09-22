import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@mui/material";
import { information } from "../utils/information";
import {
  useCreatOrderMutation,
  useGetStripePaymentIntentQuery,
} from "../redux/api/allApiEndpoints";
import { toast } from "react-toastify";
import { TOrder } from "../types/AllTypes";
import { useNavigate } from "react-router-dom";

function StripeCheckoutFormComponent({
  deliveryAddress,
  amount,
  order,
}: {
  deliveryAddress: any;
  amount: number;
  order: TOrder;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const stripeOrder = order as TOrder;
  const { data: serverPaymentIntent, isSuccess } =
    useGetStripePaymentIntentQuery({ amount, currency: "usd" }, {});
  const client_secret = serverPaymentIntent?.data.client_secret as string;
  const navigate = useNavigate();
  const [createOrder] = useCreatOrderMutation();

  if (isSuccess) {
    stripeOrder.client_secret = client_secret;
    toast.success(
      "Stripe payment gateway is ready for Your secure transaction"
    );
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (stripe && elements) {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        toast.error(
          `Your input credentials have problem. Please double check before payment.
          Current error message:
          ${submitError.message}
          `
        );
        return;
      }
      const { paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
        confirmParams: {
          payment_method_data: {
            billing_details: {
              name: deliveryAddress.address.name,
              address: {
                city: deliveryAddress.address.city,
                country: deliveryAddress.address.country,
                line1: deliveryAddress.address.line1,
                line2: deliveryAddress.address.line2,
                postal_code: deliveryAddress.address.postal_code,
              },
              phone: deliveryAddress.phone,
            },
          },
          return_url: information.redirect_url, // Replace with your own URL
        },
        clientSecret: client_secret,
      });

      if (paymentIntent) {
        toast.success(`Payment is successful`);
        createOrder(stripeOrder);
        navigate("/success");
      }
    } else {
      toast.error(
        "Stripe payment gateway faces problem. Please wait for some time and try again."
      );
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
      </form>
    </div>
  );
}

export default StripeCheckoutFormComponent;
