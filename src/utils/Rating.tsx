"use client";
import React, { useState } from "react";
import { MdOutlineStar, MdStar } from "react-icons/md";

interface RatingProps {
  onChange?: (rating: number) => void;
  initialRating?: number;
}

const Rating: React.FC<RatingProps> = ({ onChange, initialRating = 0 }) => {
  const [rating, setRating] = useState<number>(initialRating);

  const handleClick = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div style={{ display: "flex", gap: "4px", cursor: "pointer" }}>
      {[1, 2, 3, 4, 5].map((value) => (
        <span key={value} onClick={() => handleClick(value)}>
          {rating >= value ? (
            <MdStar size={28} color="#FBBF24" /> // yellow filled star
          ) : (
            <MdOutlineStar size={28} color="#D1D5DB" /> // gray empty star
          )}
        </span>
      ))}
    </div>
  );
};

export default Rating;
