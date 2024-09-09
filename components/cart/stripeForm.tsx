import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useAppSelector } from "@/store/useAppSelector";
import { useAppDispatch } from "@/store/useAppDispatch";
import { resetCart } from "@/store/cartSlice";
import { toast } from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

interface StripeFormProps {
  address: string;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

const cardStyle = {
  style: {
    base: {
      color: "#ffffff",
      fontFamily: '"Roboto", sans-serif',
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#cccccc",
      },
    },
    invalid: {
      color: "#ff4d4d",
    },
  },
};

const StripeForm: React.FC<StripeFormProps> = ({ address, setCurrentStep }) => {
  const [isLoading, setIsLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setIsLoading(false);
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      toast.error("Payment failed. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          items: cartItems,
          address,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Your food is on its way!");
        dispatch(resetCart());
        setCurrentStep(1);
      } else {
        toast.error(data.error || "Payment failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("An error occurred. Please try again later.");
    }

    setIsLoading(false);
  };
  return (
    <div className="flex flex-col w-full max-w-md mx-auto">
      <div className="flex items-center mb-12">
        <button
          onClick={() => setCurrentStep(2)}
          className="mr-4 flex items-center justify-center"
        >
          <FaArrowLeft className="text-orange-500 text-xl hover:text-orange-700" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold text-h1Text">
          Card Details
        </h2>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col w-full">
        <div className="flex flex-col w-full mb-4">
          <CardElement
            options={cardStyle}
            className="w-full p-2 bg-gray-700 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || isLoading}
          className="w-full mt-4 py-2 bg-orange-500 hover:bg-orange-700 text-white rounded-lg disabled:bg-gray-400"
        >
          {isLoading ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default StripeForm;
