import React, { useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { useAppSelector } from "@/store/useAppSelector";
import { useAppDispatch } from "@/store/useAppDispatch";
import RenderCheckout from "./renderCheckout";
import RenderCart from "./renderCart";
import ProgressBar from "./progressBar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeForm from "./stripeForm";
import { toast } from "react-hot-toast";

// Loading Stripe outside of the component to avoid recreating it on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart: React.FC = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [address, setAddress] = useState<string>("");

  const deliveryFee = 75.0;
  const platformFee = 4.99;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const total = subtotal + deliveryFee + platformFee;

  const handleConfirmItems = () => {
    if (address.trim() === "") {
      toast.error("Please enter a delivery address");
      return;
    }
    setCurrentStep(2);
  };

  const handlePlaceOrder = () => {
    setCurrentStep(3);
  };

  const getTitle = () => {
    switch (currentStep) {
      case 1:
        return "Cart";
      case 2:
        return "Checkout";
      case 3:
        return "Payment";
      default:
        return "Cart";
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative">
          <RiShoppingBag4Fill className="text-pText text-[1.4rem] sm:text-[1.7rem] hover:text-food_yellow transition-all duration-300 " />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 text-white bg-food_red rounded-full px-1.5 sm:px-2 text-[0.6rem] sm:text-[0.7rem] z-20">
              {cartItems.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent className="bg-gray-800/35 border-none shadow-xl shadow-orange-600/50 flex flex-col overflow-hidden p-4 sm:p-6 scrollbar-none">
        {cartItems.length === 0 ? (
          <SheetHeader>
            <SheetTitle>
              <h1 className="text-3xl sm:text-4xl font-bold font-bodyFont mb-6 tracking-[0.15rem] uppercase bg-gradient-to-r from-food_red to-yellow-500 bg-clip-text text-transparent">
                Hungry?
              </h1>
            </SheetTitle>
            <SheetDescription>
              <p className="text-base sm:text-lg text-pText mb-4">
                You have not added anything in your cart!
              </p>
              <Link href="/menu" passHref>
                <SheetClose asChild>
                  <button className="px-4 py-2 bg-food_yellow text-h1Text text-base sm:text-lg font-semibold hover:bg-food_red rounded-xl">
                    Browse
                  </button>
                </SheetClose>
              </Link>
            </SheetDescription>
          </SheetHeader>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto scrollbar-none">
              <SheetHeader>
                <SheetTitle className="text-lg sm:text-xl font-bold text-h1Text">
                  {getTitle()}
                </SheetTitle>
                <SheetDescription>
                  <div className="text-xs sm:text-sm text-gray-400 mb-4">
                    Crave House - Syed Huzaifa
                  </div>
                  <ProgressBar currentStep={currentStep} />
                  <div className="border border-gray-700 mt-3 mb-5"></div>
                </SheetDescription>
              </SheetHeader>

              {currentStep === 1 && (
                <RenderCart
                  cartItems={cartItems}
                  subtotal={subtotal}
                  deliveryFee={deliveryFee}
                  platformFee={platformFee}
                  dispatch={dispatch}
                  address={address}
                  setAddress={setAddress}
                />
              )}

              {currentStep === 2 && (
                <RenderCheckout
                  setCurrentStep={setCurrentStep}
                  cartItems={cartItems}
                  address={address}
                  total={total}
                />
              )}

              {currentStep === 3 && (
                <Elements stripe={stripePromise}>
                  <StripeForm
                    setCurrentStep={setCurrentStep}
                    address={address}
                  />
                </Elements>
              )}
            </div>

            {currentStep !== 3 && (
              <div className="border-t border-gray-700 pt-4 mt-auto text-h1Text">
                <div className="flex justify-between font-semibold mb-4 text-sm sm:text-base">
                  <span>Total (incl. VAT)</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                <button
                  className="w-full py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm sm:text-base"
                  onClick={
                    currentStep === 1 ? handleConfirmItems : handlePlaceOrder
                  }
                >
                  {currentStep === 1
                    ? "Confirm items and address"
                    : "Place Order"}
                </button>
              </div>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
