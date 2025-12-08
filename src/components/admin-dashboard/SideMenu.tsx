"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "@/styles/Header/Header.module.css";
import { MdDashboard } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";
import { useMedia } from "@/hooks/useResponsive";

const SideMenu = () => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  const products = () => {
    router.push("/dashboard-73450/products-105/");
  };
  const videos = () => {
    router.push("/dashboard-73450/videos-105/");
  };
  const categories = () => {
    router.push("/dashboard-73450/categories-105/");
  };
  const store = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col p-3 gap-3 h-screen">
      <Image
        onClick={goHome}
        className={styles.logo}
        src="/logo.svg"
        alt="Profile picture of Rex"
        width={200}
        height={200}
        priority // optional: preloads the image for better performance
      />
      <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm">
        <MdDashboard
          style={{ fontSize: "12px", cursor: "pointer", color: "#513cbf" }}
        />
        <label className="font-medium text-[12px] cursor-pointer text-[#513cbf]">
          Dashboard
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
        <FiShoppingBag
          onClick={products}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
        <label
          onClick={products}
          className="font-medium text-[14px] cursor-pointer"
        >
          Products
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
        <MdFormatListBulleted
          onClick={categories}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
        <label
          onClick={categories}
          className="font-medium text-[14px] cursor-pointer"
        >
          Categories
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
        <IoVideocamOutline
          onClick={videos}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
        <label
          onClick={videos}
          className="font-medium text-[14px] cursor-pointer"
        >
          Videos
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm  mt-auto">
        <IoVideocamOutline
          onClick={store}
          style={{ fontSize: "14px", cursor: "pointer" }}
        />
        <label
          onClick={store}
          className="font-medium text-[14px] cursor-pointer"
        >
          View Store
        </label>
      </div>
    </div>
  );
};

export default SideMenu;
