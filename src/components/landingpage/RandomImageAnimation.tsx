"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const images: string[] = [
  "/images/dresses/dresses2.jpeg",
  "/images/ladies-caps/ladies-caps1.jpeg",
  "/images/ladies-pants/ladies-pants2.jpeg",
  "/images/men-watches/men-watches1.jpeg",
  "/images/men-shoes/men-shoes1.jpeg",
  "/images/ladies-underwears/ladies-underwears1.jpeg",
  "/images/dresses/dresses1.jpeg",
  "/images/ladies-caps/ladies-caps2.jpeg",
  "/images/ladies-pants/ladies-pants1.jpeg",
  "/images/men-watches/men-watches2.jpeg",
  "/images/men-shoes/men-shoes2.jpeg",
  "/images/ladies-underwears/ladies-underwears2.jpeg",
];

const RandomImageAnimation: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string>(images[0]);
  const [fade, setFade] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setCurrentImage(images[randomIndex]);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden bg-black">
      <Image
        src={currentImage}
        alt="Fashion"
        fill
        sizes="100vw"
        className={`object-contain transition-all duration-700 rounded-2xl
          ${fade ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        quality={100} // ← MAXIMUM SHARPNESS
        priority // ← loads first image in high quality
      />
    </div>
  );
};

export default RandomImageAnimation;
