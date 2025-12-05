"use client";
import React from "react";
import {
  MdOutlineStarPurple500,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";

interface RenderStarsProps {
  rating: number;
  maxStars?: number;
  color?: string;
}

export const renderStars = ({
  rating,
  maxStars = 5,
  color = "#ffcc00",
}: RenderStarsProps) => {
  const stars = [];
  if (rating <= 0) {
    for (let i = 0; i < maxStars; i++) {
      stars.push(
        <MdOutlineStarOutline key={"empty-zero-" + i} style={{ color }} />
      );
    }
    return stars;
  }

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxStars - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<MdOutlineStarPurple500 key={"full-" + i} style={{ color }} />);
  }
  if (hasHalfStar) {
    stars.push(<MdOutlineStarHalf key="half" style={{ color }} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<MdOutlineStarOutline key={"empty-" + i} style={{ color }} />);
  }

  return stars;
};
