"use client";
import React from "react";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { useRouter } from "next/navigation";
import styles from "@/styles/Header/Header.module.css";
import { MdDashboard } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";
import { IoVideocamOutline } from "react-icons/io5";

const SideMenu = () => {
  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col p-3 gap-3 h-screen">
      <Image
        onClick={goHome}
        className={styles.logo}
        src={Logo}
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
      <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm">
        <FiShoppingBag
          style={{ fontSize: "14px", cursor: "pointer", color: "#513cbf" }}
        />
        <label className="font-medium text-[14px] cursor-pointer text-[#513cbf]">
          Products
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm">
        <MdFormatListBulleted
          style={{ fontSize: "14px", cursor: "pointer", color: "#513cbf" }}
        />
        <label className="font-medium text-[14px] cursor-pointer text-[#513cbf]">
          Categories
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm">
        <IoVideocamOutline
          style={{ fontSize: "14px", cursor: "pointer", color: "#513cbf" }}
        />
        <label className="font-medium text-[14px] cursor-pointer text-[#513cbf]">
          Videos
        </label>
      </div>
      <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm  mt-auto">
        <IoVideocamOutline
          style={{ fontSize: "14px", cursor: "pointer", color: "#513cbf" }}
        />
        <label className="font-medium text-[14px] cursor-pointer text-[#513cbf]">
          View Store
        </label>
      </div>
    </div>
  );
};

export default SideMenu;
