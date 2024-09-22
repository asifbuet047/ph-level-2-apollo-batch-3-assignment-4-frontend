import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { AddressElement, Elements } from "@stripe/react-stripe-js";
import StripeCheckoutFormComponent from "../components/StripeCheckoutFormComponent";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useAppSelector } from "../redux/hooks";
import { TCartData, TOrder } from "../types/AllTypes";
import { useNavigate } from "react-router-dom";
import { useCreatOrderMutation } from "../redux/api/allApiEndpoints";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("1");
  const [deliveryAddress, setDeliveryAddress] = useState<any>();
  const [isStripePayment, setIsStripePayment] = useState<boolean>(false);
  const cart = useAppSelector((state) => state.cart.items) as TCartData[];
  const subTotal = cart
    .map((each) => each.price * each.quantity)
    .reduce((accumulator, current) => {
      return accumulator + current;
    }, 0);
  const [createOrder] = useCreatOrderMutation();
  const grandTotal = (subTotal * 0.15 + subTotal) * 100;
  const navigate = useNavigate();
  const order: TOrder = {
    client_country: deliveryAddress?.address.country as string,
    client_name: deliveryAddress?.name as string,
    client_phone_number: deliveryAddress?.phone as string,
    client_secret: "",
    payment_status: "paid",
    products_id: cart.map((each) => each.id),
    products_name: cart.map((each) => each.name),
    products_price: cart.map((each) => each.price),
    products_quantity: cart.map((each) => each.quantity),
  };

  const onPaymentMethodChange = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value);
  };

  const onPlaceOrderButtonClick = () => {
    if (paymentMethod == "2") {
      setIsStripePayment(true);
    } else {
      order.payment_status = "cod";
      createOrder(order);
      navigate("/success", { state: { success: true } });
    }
  };

  return (
    <div className="bg-[#C0F5FA]">
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: grandTotal,
          currency: "usd",
          appearance: { theme: "stripe" },
        }}
      >
        {isStripePayment ? (
          <StripeCheckoutFormComponent
            deliveryAddress={deliveryAddress}
            amount={grandTotal}
            order={order}
          />
        ) : (
          <div className="flex flex-col justify-center ml-5 mr-5 p-2 items-center">
            <p className="text-4xl font-bold my-2">Your Shipping Address</p>
            <AddressElement
              className="w-full md:w-1/2"
              options={{
                mode: "shipping",
                display: { name: "split" },
                fields: { phone: "always" },
                defaultValues: {
                  firstName: "Your first name",
                  lastName: "Your last name",
                  address: {
                    country: "bd",
                    city: "Example: Dhaka",
                    postal_code: "1200",
                  },
                },
              }}
              onChange={(event) => setDeliveryAddress(event.value)}
            />

            <div className="flex flex-col justify-center itemcen my-4">
              <FormControl>
                <InputLabel id="paymentMethod">Method of Payment</InputLabel>
                <Select
                  value={paymentMethod}
                  labelId="paymentMethod"
                  label="Method of Payment"
                  onChange={onPaymentMethodChange}
                >
                  <MenuItem value={1}>Cash On Delivery</MenuItem>
                  <MenuItem value={2}>Online Payment (Stripe)</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" onClick={onPlaceOrderButtonClick}>
                Place Order
              </Button>
            </div>
          </div>
        )}
      </Elements>
    </div>
  );
}

export default CheckoutPage;
