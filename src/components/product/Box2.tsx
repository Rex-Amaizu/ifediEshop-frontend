"use client";
import React, { useState } from "react";
import { renderStars } from "@/utils/rateCalculation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addToCart } from "@/redux/slices/cartSlice";

interface Review {
  rating?: number;
  review?: string;
}

interface Box2Props {
  product: {
    _id: string;
    name: string;
    description?: string;
    sizes: string[];
    reviews?: Review[];
    colors: string[];
    price: number;
  };
}

const Box2: React.FC<Box2Props> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { loading } = useAppSelector((state) => state.cart);

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];
  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

  const add2Cart = () => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    // Validate color if product has multiple colors
    if (product.colors.length > 0 && !selectedColor) {
      alert("Please select a color");
      return;
    }

    // Validate size if product has multiple sizes
    if (product.sizes.length > 0 && !selectedSize) {
      alert("Please select a size");
      return;
    }

    dispatch(
      addToCart({
        productId: product._id,
        quantity: 1,
        color: selectedColor,
        size: selectedSize,
      })
    );
  };

  return (
    <div className="bg-white flex flex-col gap-8 w-full min-w-0">
      <div className="flex flex-col gap-2.5">
        <label className="font-bold text-2xl text-black">{product.name}</label>
        <h2 className="font-bold text-lg text-black">
          ${product.price.toFixed(2)}
        </h2>
      </div>

      <div className="flex flex-row gap-2 items-center">
        <div className="flex flex-row gap-0.5">
          {renderStars({ rating: averageRating })}
        </div>
        <p className="text-xs font-medium text-[#999999]">
          {reviews.length} Reviews
        </p>
      </div>

      <p className="text-xs font-medium text-[#999999] text-wrap w-full break-words whitespace-normal">
        {product.description}
      </p>

      {product.sizes.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <h1 className="text-sm font-medium text-black">Size</h1>
          <div className="flex flex-row gap-1">
            {product.sizes.map((size, index) => (
              <span
                key={index}
                onClick={() => setSelectedSize(size)}
                className={`flex items-center justify-center text-xs font-medium text-black rounded-sm border w-10 h-6 cursor-pointer
                  ${
                    selectedSize === size
                      ? "border-purple-950 outline outline-purple-950"
                      : ""
                  }`}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      )}

      {product.colors.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <h1 className="text-sm font-medium text-black">Color</h1>
          <div className="flex flex-row gap-1">
            {product.colors.map((color, index) => (
              <span
                key={index}
                onClick={() => setSelectedColor(color)}
                className={`flex items-center justify-center rounded-full border w-6 h-6 cursor-pointer
                  ${
                    selectedColor === color
                      ? "border-purple-950 ring-2 ring-purple-950"
                      : "border-gray-300"
                  }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={add2Cart}
        className={`flex items-center justify-center text-white text-lg font-semibold rounded-md w-full h-12
    ${
      loading ||
      (product.sizes.length > 0 && !selectedSize) ||
      (product.colors.length > 0 && !selectedColor)
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-[#21184e] cursor-pointer"
    }`}
        disabled={
          loading ||
          (product.sizes.length > 0 && !selectedSize) ||
          (product.colors.length > 0 && !selectedColor)
        }
      >
        {loading ? "Loading..." : "Add to Cart"}
      </button>
    </div>
  );
};

export default Box2;
