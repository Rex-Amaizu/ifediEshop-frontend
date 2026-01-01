"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "@/styles/cart/Cart.module.css";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { removeFromCart, updateCart } from "@/redux/slices/cartSlice";
import { formatPrice } from "@/utils/formatPrice";

interface CartProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
  };
  quantity: number;
  size: string | null;
  color: string | null;
  onRemoveSuccess?: (msg: string) => void;
  onRemoveFailure?: (msg: string) => void;
}

const CartItem = ({
  product,
  quantity,
  color,
  size,
  onRemoveFailure,
  onRemoveSuccess,
}: CartProps) => {
  const [localQuantity, setLocalQuantity] = useState<number>(quantity);
  const [isLoading, setIsLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const dispatch = useAppDispatch();

  const increaseQuantity = async () => {
    setIsLoading(true);
    const newQty = localQuantity + 1;
    setLocalQuantity(newQty);

    try {
      await dispatch(
        updateCart({ productId: product._id, quantity: newQty })
      ).unwrap();
    } catch (err) {
      setLocalQuantity(localQuantity); // rollback on error
    } finally {
      setIsLoading(false);
    }
  };

  const reduceQuantity = async () => {
    if (localQuantity <= 1) return;

    setIsLoading(true);
    const newQty = localQuantity - 1;
    setLocalQuantity(newQty);

    try {
      await dispatch(
        updateCart({ productId: product._id, quantity: newQty })
      ).unwrap();
    } catch (err) {
      setLocalQuantity(localQuantity);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async () => {
    try {
      setRemoveLoading(true);
      const res = await dispatch(
        removeFromCart({ productId: product._id, color: color, size: size })
      ).unwrap();
      if (onRemoveSuccess) {
        onRemoveSuccess(res.message);
      }
      setRemoveLoading(false);
    } catch (err: any) {
      setRemoveLoading(false);
      console.log("error", err);
      if (onRemoveFailure) {
        onRemoveFailure(err);
      }
    }
  };

  return (
    <div className="flex flex-col">
      <div className={styles.cartItem}>
        <div className={styles.item}>
          <Image
            className="rounded-sm"
            src={product.images[0]}
            alt=""
            width={80}
            height={80}
            priority
          />
          <div className={styles.itemDesc}>
            <label className="text-xs text-black font-semibold">
              {product.name}
            </label>
            <div className="flex flex-col gap-1">
              <div className="flex flex-row gap-0.5">
                <span className="text-xs text-[#808080] font-normal">
                  Size:
                </span>

                <span className="flex items-center justify-center text-xs font-medium text-black rounded-sm border w-10 h-4">
                  {size}
                </span>
              </div>
              <div className="flex flex-row gap-0.5">
                <p className="text-xs text-[#808080] font-normal">Color:</p>

                <span
                  className="flex items-center justify-center rounded-full border w-4 h-4"
                  style={{ backgroundColor: color ? color : "" }}
                />
              </div>
            </div>
            <h6
              onClick={removeProduct}
              className="text-xs text-[#513cbf] font-medium cursor-pointer"
            >
              {removeLoading ? "Loading" : "Remove"}
            </h6>
          </div>
        </div>
        <div className={styles.priceDiv}>
          <p className="text-xs text-black font-normal">
            {formatPrice(product.price)}
          </p>
          <div className="flex flex-row gap-1 items-center justify-center">
            <button
              onClick={reduceQuantity}
              disabled={isLoading || localQuantity <= 1}
              className={`flex items-center justify-center text-white font-semibold text-xs h-6 w-6 cursor-pointer 
                ${
                  isLoading || localQuantity <= 1
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#513cbf]"
                }`}
            >
              -
            </button>
            <div className="flex items-center justify-center w-6 h-6">
              {isLoading ? (
                <div className="animate-spin rounded-full border-2 border-t-transparent border-gray-300 w-4 h-4" />
              ) : (
                <p className="text-black font-semibold text-xs">
                  {localQuantity}
                </p>
              )}
            </div>
            <button
              onClick={increaseQuantity}
              disabled={isLoading}
              className={`flex items-center justify-center text-white font-semibold text-xs h-6 w-6 cursor-pointer 
                ${
                  isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#513cbf]"
                }`}
            >
              +
            </button>
          </div>
          <h5 className="text-xs text-[#513cbf] font-normal">
            {formatPrice(Number(product.price) * Number(localQuantity))}
          </h5>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
