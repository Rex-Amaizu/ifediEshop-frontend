import React from "react";
import Image from "next/image";
import styles from "@/styles/LandingPage/Items.module.css";
import { GoLock } from "react-icons/go";
import { useRouter } from "next/navigation";

interface Stock {
  total: number;
  sold: number;
  damaged: number;
  returned: number;
}

interface Props {
  descriptionImg: string;
  displayImg: string[];
  colors: string[];
  sizes: string[];
  name: string;
  price: number;
  stock: Stock;
  id: string;
}

const Items = ({
  descriptionImg,
  displayImg,
  name,
  price,
  stock,
  sizes,
  colors,
  id,
}: Props) => {
  const router = useRouter(); // initialize router

  const goToProductPage = () => {
    if (stock.total === 0) return;
    router.push(`/products/${id}`);
  };
  return (
    <div className={styles.container} onClick={goToProductPage}>
      <div className={styles.imageWrapper}>
        <Image
          className="rounded-xl"
          src={displayImg[0]}
          alt="suit"
          fill
          priority // optional: preloads the image for better performance
        />
      </div>

      <div className={styles.namePrice}>
        <label>{name}</label>
        <p>${price.toFixed(2)}</p>
      </div>
      {stock.total === 0 ? (
        <button
          disabled
          className="flex flex-row gap-2 items-center justify-center h-12 text-[#21184e] bg-white border-2 bord rounded-lg z-5"
        >
          <GoLock />
          Out of stock
        </button>
      ) : (
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevent triggering parent click (card click)
            goToProductPage();
          }}
          className="h-12 text-white bg-[#21184e] hover:bg-[#513cbf] rounded-lg z-5 cursor-pointer"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};

export default Items;
