import React, { useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import GoogleButton from "./GoogleAuthentication/GoogleButton";

const stripePromise = loadStripe(
  String(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
);

function App() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
      <GoogleButton />
    </>
  );
}

export default App;
