// "use client";
import React from "react";
import { dummyProducts } from "@/utils/mockdata/items";
import Image from "next/image";
import Header from "@/components/global/header/Header";
import styles from "@/styles/Description/Description.module.css";
import {
  MdOutlineStarPurple500,
  MdOutlineStarHalf,
  MdOutlineStarOutline,
} from "react-icons/md";
import Box1 from "@/components/product/Box1";
import Box2 from "@/components/product/Box2";
import Box4 from "@/components/product/Box4";
import Box5 from "@/components/product/Box5";
import Footer from "@/components/global/footer/Footer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";

interface PageProps {
  params: {
    id: string;
  };
}

// generate static pages for all products
export function generateStaticParams() {
  return dummyProducts.map((product) => ({ id: product.id }));
}

const ProductPage = ({ params }: PageProps) => {
  // const dispatch = useAppDispatch();

  // const { data: categories, loading: categoriesLoading } = useAppSelector(
  //   (s) => s.categories
  // );
  // const { data: products, loading: productsLoading } = useAppSelector(
  //   (s) => s.products
  // );

  // useEffect(() => {
  //   dispatch(fetchCategories());
  //   dispatch(fetchProducts());
  // }, [dispatch]);

  const product = dummyProducts.find((p) => p.id === params.id);

  if (!product) return <p>Product not found</p>;
  const reviews = Array.isArray(product.reviews) ? product.reviews : [];

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div style={{ gridArea: "box1" }}>
          <Box1 product={product} />
        </div>
        <div style={{ gridArea: "box2" }}>
          <Box2 product={product} />
        </div>
        <div className="flex flex-col gap-2.5" style={{ gridArea: "box3" }}>
          <label className="font-semibold text-lg text-black">
            Customer Reviews
          </label>
          <hr className="text-[#999999] font-normal" />
        </div>
        <div style={{ gridArea: "box4" }}>
          <Box4 />
        </div>
        <div className="flex flex-col gap-5" style={{ gridArea: "box5" }}>
          <label className="font-semibold text-lg text-black">Reviews</label>
          {reviews.map((r, index) => (
            <Box5
              key={index}
              rating={r.rating}
              review={r.review}
              userName={r.userName}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-start pl-5 pr-5 mt-5 bg-[#f2f2f2] h-auto ms:h-[200px]">
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
