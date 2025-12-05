"use client";
import React, { useState } from "react";
import {
  MdOutlineStarPurple500,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";
import { renderStars } from "@/utils/rateCalculation";

interface Review {
  rating?: number;
  review?: string;
}

interface Box2Props {
  product: {
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

  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  const averageRating =
    reviews.length === 0
      ? 0
      : reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length;

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
      <div className="flex flex-col gap-2.5">
        <h1 className="text-sm font-medium text-black">Size</h1>
        <div className="flex flex-row gap-1">
          {product.sizes.map((size, index) => (
            <span
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`flex items-center justify-center text-xs font-medium text-black rounded-sm border w-6 h-6 cursor-pointer
            ${selectedSize === size ? "border-purple-950 outline outline-purple-950" : ""}`}
            >
              {size}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5">
        <h1 className="text-sm font-medium text-black">Color</h1>
        <div className="flex flex-row gap-1">
          {product.colors.map((color, index) => (
            <span
              key={index}
              onClick={() => setSelectedSize(color)}
              className={`flex items-center justify-center rounded-full border w-6 h-6 cursor-pointer
      ${selectedSize === color ? "border-purple-950 ring-2 ring-purple-950" : "border-gray-300"}`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <button className="flex items-center justify-center text-white text-lg font-semibold rounded-md bg-[#21184e] cursor-pointer w-full h-12">
        Add to Cart
      </button>
    </div>
  );
};

export default Box2;
