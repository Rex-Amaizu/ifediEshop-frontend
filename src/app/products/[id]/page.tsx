"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Header from "@/components/global/header/Header";
import Footer from "@/components/global/footer/Footer";
import Box1 from "@/components/product/Box1";
import Box2 from "@/components/product/Box2";
import Box4 from "@/components/product/Box4";
import Box5 from "@/components/product/Box5";
import styles from "@/styles/Description/Description.module.css";
import { apiUrl } from "@/utils/constants";
import { useAppDispatch } from "@/redux/hooks";
import {
  Review,
  ProductCategory,
  fetchProduct,
} from "@/redux/slices/productSlice";

const ProductPage = () => {
  const [failure, setFailure] = useState<string>("");
  const { id } = useParams(); // get product ID from route
  const { token } = useAppSelector((state) => state.auth); // get token from Redux
  const { singleProduct, loading, error } = useAppSelector(
    (state) => state.products
  );

  const dispatch = useAppDispatch();

  const productId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!token) {
      setFailure("No access token found. Please login.");
      return;
    }

    dispatch(fetchProduct(productId!))
      .unwrap()
      .catch((err: string) => setFailure(err));
  }, [id, token, dispatch]);

  if (loading) return <p>Loading product...</p>;
  if (failure)
    return (
      <div className={styles.container}>
        <Header />
        <p className="w-full h-14 bg-red-800 text-black flex items-center justify-center">
          {failure}
        </p>
      </div>
    );

  if (!singleProduct) return <p>Product not found</p>;

  const reviews: Review[] = Array.isArray(singleProduct.reviews)
    ? singleProduct.reviews
    : [];

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.body}>
        <div style={{ gridArea: "box1" }}>
          <Box1 product={singleProduct} />
        </div>
        <div style={{ gridArea: "box2" }}>
          <Box2 product={singleProduct} />
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
