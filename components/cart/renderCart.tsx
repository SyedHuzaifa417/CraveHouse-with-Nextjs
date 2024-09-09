import React from "react";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MdDeliveryDining } from "react-icons/md";
import Image from "next/image";
import { AppDispatch } from "@/store/store";
import { decreaseQuantity, increaseQuantity } from "@/store/cartSlice";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartItemProps {
  item: CartItem;
  dispatch: AppDispatch;
}

const CartItem: React.FC<CartItemProps> = ({ item, dispatch }) => (
  <div className="flex items-center justify-between p-2 bg-gray-800 rounded-lg">
    <div className="flex items-center">
      <div className="w-16 h-12 sm:w-20 sm:h-16 bg-gray-900 rounded-lg mr-2 sm:mr-4 ">
        <Image
          src={item.imageUrl}
          alt={item.name}
          width={200}
          height={200}
          className="object-cover w-full h-full rounded-lg"
        />
      </div>
      <div>
        <h3 className="font-semibold text-h1Text text-sm sm:text-base">
          {item.name}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm">
          Rs. {item.price * item.quantity}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-2 sm:space-x-3">
      <button onClick={() => dispatch(decreaseQuantity(item.id))}>
        <FaMinusCircle className="text-orange-500 text-base sm:text-lg hover:text-orange-700" />
      </button>
      <span className="text-white text-sm sm:text-lg">{item.quantity}</span>
      <button onClick={() => dispatch(increaseQuantity(item.id))}>
        <FaPlusCircle className="text-orange-500 text-base sm:text-lg hover:text-orange-700" />
      </button>
    </div>
  </div>
);

interface RenderCartProps {
  cartItems: CartItem[];
  subtotal: number;
  deliveryFee: number;
  platformFee: number;
  dispatch: AppDispatch;
  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;
}

const RenderCart: React.FC<RenderCartProps> = ({
  cartItems,
  subtotal,
  deliveryFee,
  platformFee,
  dispatch,
  address,
  setAddress,
}) => {
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  return (
    <>
      <Alert className="mb-4 bg-gray-700 border-none shadow-sm shadow-gray-400">
        <AlertDescription className="flex items-center">
          <MdDeliveryDining className="mr-2 text-orange-600 text-xl sm:text-2xl" />

          <input
            type="text"
            id="address"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter your delivery address"
            className="w-full px-4 py-2 border-none bg-transparent rounded-lg text-white focus:outline-none"
          />
        </AlertDescription>
      </Alert>

      <div className="flex flex-col space-y-4">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} dispatch={dispatch} />
        ))}
      </div>
      <Link href="/menu" passHref>
        <SheetClose asChild>
          <button className="w-full mt-6 py-2 text-orange-500 hover:bg-orange-500 hover:text-white text-center border border-orange-500 rounded-lg mb-4 text-sm sm:text-base">
            Add more items
          </button>
        </SheetClose>
      </Link>
      <div className="border-t border-gray-700 pt-4 mt-4 text-h1Text text-sm sm:text-base">
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>Rs. {subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Delivery Fee</span>
          <span>Rs. {deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Platform Fee</span>
          <span>Rs. {platformFee.toFixed(2)}</span>
        </div>
      </div>
    </>
  );
};

export default RenderCart;
