import React from "react";
import { FaArrowLeft } from "react-icons/fa";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface RenderCheckoutProps {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  cartItems: CartItem[];
  address: string;
  total: number;
}

const RenderCheckout: React.FC<RenderCheckoutProps> = ({
  setCurrentStep,
  cartItems,
  address,
  total,
}) => {
  return (
    <div className="text-h1Text">
      <div className="flex items-center mb-8">
        <button onClick={() => setCurrentStep(1)} className="mr-4">
          <FaArrowLeft className="text-orange-500 text-xl hover:text-orange-700" />
        </button>
        <h2 className="text-xl sm:text-2xl font-bold">Order Summary</h2>
      </div>
      <div className="mb-8">
        <h3 className="font-semibold mb-2 text-white">Delivery Address:</h3>
        <p>{address}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-white">Items:</h3>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name}{" "}
              <span className="text-orange-500 ml-3">x {item.quantity}</span>
            </span>
            <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="font-semibold text-lg text-end mt-12 text-food_yellow">
        Total: Rs. {total.toFixed(2)}
      </div>
    </div>
  );
};

export default RenderCheckout;
