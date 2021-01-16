import { loadStripe } from "@stripe/stripe-js";
import { API } from "aws-amplify";
import config from "../config";
import { onError } from "./errorLib";

export default async (email = null) => {
  const stripe = await loadStripe(config.STRIPE_KEY);
  const { session } = await API.post(
    "secret-sharer",
    "/create-billing-portal-session",
    {
      body: {
        email,
      },
    }
  );

  console.log({ session });

  // const result = await stripe.redirectToCheckout({
  //   sessionId: session.id,
  // });

  // if (result.error) {
  //   // If `redirectToCheckout` fails due to a browser or network
  //   // error, display the localized error message to your customer
  //   // using `result.error.message`.
  //   onError(result.error.message);
  // }
};
