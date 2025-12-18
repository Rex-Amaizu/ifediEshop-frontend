"use client";
import React from "react";
import Image from "next/image";
import styles from "@/styles/Description/Description.module.css";
import { useRouter } from "next/navigation";
import { ProductCategory } from "@/redux/slices/productSlice";

interface Box1Props {
  product: {
    name: string;
    category: ProductCategory[];
    subCategory: string;
    images: string[];
  };
}

const Box1: React.FC<Box1Props> = ({ product }) => {
  const router = useRouter();
  const goHome = () => {
    router.push(`/`);
  };
  return (
    <div className="flex flex-col p-2.5 rounded-xl gap-5 h-[400px] ms:h-[600px]">
      <div className="flex rounded-xl flex-row gap-2.5">
        <p
          onClick={goHome}
          className="text-sm font-medium text-[#999999] cursor-pointer"
        >
          Home/
        </p>
        <p className="text-sm font-medium text-[#999999] cursor-pointer">
          {product.category[0].name}/
        </p>
        <p className="text-sm font-semibold text-black cursor-pointer">
          {product.subCategory}
        </p>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          className="rounded-xl"
          src={product.images[1]}
          alt="suit"
          fill
          priority // optional: preloads the image for better performance
        />
      </div>
    </div>
  );
};

export default Box1;
