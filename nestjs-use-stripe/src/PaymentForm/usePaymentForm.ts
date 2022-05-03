import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { FormEvent } from "react";

function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const getPaymentMethodId = async () => {
    const cardElement = elements?.getElement(CardElement);

    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;

    if (error || !paymentMethod) {
      return;
    }

    return paymentMethod.id;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const paymentMethodId = await getPaymentMethodId();

    if (!paymentMethodId) {
      return;
    }

    // api "/charge" thanh toan truc tiep
    // api "credit-cards" them card credit
    const response = await fetch(`${process.env.REACT_APP_API_URL}/charge`, {
      method: "POST",
      body: JSON.stringify({
        paymentMethodId,
        amount: 100,
      }),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();
    console.log(["secret"], responseJson);

    if (responseJson.status !== "succeeded") {
      const clientSecret = responseJson.client_secret;

      await stripe?.confirmCardPayment(clientSecret); // dung the co san
      // stripe?.confirmCardSetup(clientSecret); // thiet lap the moi
    }
  };

  return {
    handleSubmit,
  };
}

export default usePaymentForm;

/**
 * 
 * import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FormEvent } from 'react';
 
function usePaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
 
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
 
    const amountToCharge = 100;
 
    const cardElement = elements?.getElement(CardElement);
 
    if (!stripe || !elements || !cardElement) {
      return;
    }
 
    const stripeResponse = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement
    });
 
    const { error, paymentMethod } = stripeResponse;
 
    if (error || !paymentMethod) {
      return;
    }
 
    const paymentMethodId = paymentMethod.id;
 
    fetch(`${process.env.REACT_APP_API_URL}/charge`, {
      method: 'POST',
      body: JSON.stringify(({
        paymentMethodId,
        amount: amountToCharge
      })),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
 
  };
 
  return {
    handleSubmit
  }
}
 
export default usePaymentForm;
 */
