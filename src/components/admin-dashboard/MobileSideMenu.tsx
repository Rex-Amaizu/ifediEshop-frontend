"use client";
import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../../public/logo.svg";
import { GiHamburgerMenu } from "react-icons/gi";
import SideMenu from "./SideMenu";
import { MdDashboard } from "react-icons/md";
import { FiShoppingBag } from "react-icons/fi";
import { MdFormatListBulleted } from "react-icons/md";
import { IoVideocamOutline, IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import styles from "@/styles/Header/Header.module.css";

const MobileSideMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const router = useRouter();
  const goHome = () => {
    router.push("/");
  };

  const toggle = () => {
    setOpenMenu((prev) => !prev);
  };
  return (
    <div className="pl-0.5 cursor-pointer">
      <GiHamburgerMenu onClick={toggle} />
      {openMenu && (
        <div className="flex flex-col p-3 gap-3 h-screen absolute bg-white w-[200px] top-0">
          <div className="flex flex-row w-full items-center justify-between pl-0.5 pr-0.5">
            {" "}
            <Image
              onClick={goHome}
              className={styles.logo}
              src={Logo}
              alt="Profile picture of Rex"
              width={200}
              height={200}
              priority // optional: preloads the image for better performance
            />
            <IoClose onClick={toggle} />
          </div>

          <div className="flex flex-row gap-1 items-center h-[30px] bg-[#cbc5ed] pl-1.5 rounded-sm">
            <MdDashboard
              style={{
                fontSize: "12px",
                cursor: "pointer",
                color: "#513cbf",
              }}
            />
            <label className="font-medium text-[12px] cursor-pointer text-[#513cbf]">
              Dashboard
            </label>
          </div>
          <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
            <FiShoppingBag
              style={{
                fontSize: "14px",
                cursor: "pointer",
              }}
            />
            <label className="font-medium text-[14px] cursor-pointer">
              Products
            </label>
          </div>
          <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
            <MdFormatListBulleted
              style={{
                fontSize: "14px",
                cursor: "pointer",
              }}
            />
            <label className="font-medium text-[14px] cursor-pointer">
              Categories
            </label>
          </div>
          <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm">
            <IoVideocamOutline
              style={{
                fontSize: "14px",
                cursor: "pointer",
              }}
            />
            <label className="font-medium text-[14px] cursor-pointer">
              Videos
            </label>
          </div>
          <div className="flex flex-row gap-1 items-center h-[30px] pl-1.5 rounded-sm  mt-auto">
            <IoVideocamOutline
              style={{
                fontSize: "14px",
                cursor: "pointer",
              }}
            />
            <label className="font-medium text-[14px] cursor-pointer">
              View Store
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSideMenu;
