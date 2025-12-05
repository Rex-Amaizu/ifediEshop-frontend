"use client";
import React, { useState } from "react";
import { renderStars } from "@/utils/rateCalculation";

interface Review {
  rating?: number;
  comment?: string;
  userName?: string;
}

interface Box2Props {
  rating?: number;
  review?: string;
  userName?: string;
}

const Box5: React.FC<Box2Props> = ({ rating, review, userName }) => {
  const finalRating = rating ? rating : 0;
  return (
    <div className="flex flex-col gap-5 w-full min-w-0">
      <div className="flex flex-row gap-1 items-center">
        <div className="flex flex-row gap-0.5">
          {renderStars({ rating: finalRating })}
        </div>
        <p className="text-[8px] sm:text-xs font-medium text-[#999999]">
          by {userName} on October 11 2025
        </p>
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="font-normal text-sm text-black">
          Perfect for any occcasion
        </h4>
        <p className="text-[8px] sm:text-xs font-medium text-[#999999]">
          {review}
        </p>
      </div>
      <hr />
    </div>
  );
};

export default Box5;
