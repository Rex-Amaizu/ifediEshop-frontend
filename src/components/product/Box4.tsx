"use client";
import React, { useState } from "react";
import UniversalInput from "../global/input/UniversalInput";
import Rating from "@/utils/Rating";

const Box4 = () => {
  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState(0);

  return (
    <div className="flex flex-col gap-2.5">
      <label className="font-semibold text-lg text-black">Write a review</label>
      <div className="flex flex-col gap-1">
        <h3 className="font-normal text-xs text-black">Your rating</h3>
        <Rating onChange={(value) => setRating(value)} />
      </div>
      <UniversalInput
        label="Review title"
        type="text"
        name="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g Absolutely love it!"
        placeholderColor="#6b7280"
        outerClassName="w-full h-auto"
        inputClassName="w-full h-[48px] pl-5"
      />
      <UniversalInput
        as="textarea"
        label="Review"
        name="review"
        rows={6}
        placeholder="Share your thoughts"
        borderColor="#cbd5e1"
        outlineColor="#60a5fa"
        outerClassName="w-full max-w-2xl"
        inputClassName="pl-5"
      />
      <button className="flex items-center justify-center text-white text-sm font-medium rounded-md bg-[#21184e] cursor-pointer w-full h-12">
        Submit Review
      </button>
    </div>
  );
};

export default Box4;
