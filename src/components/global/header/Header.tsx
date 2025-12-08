"use client";
import React from "react";
import Image from "next/image";
import Profile from "../../../../public/profile.png";
import styles from "@/styles/Header/Header.module.css";
import { LiaBell } from "react-icons/lia";
import { PiUser } from "react-icons/pi";
import { useMedia } from "@/hooks/useResponsive";
import MobileHeader from "./MobileHeader";
import { dummyProducts } from "@/utils/mockdata/items";
import { useRouter } from "next/navigation";

interface HeaderProps {
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  selectedCategory?: string | null;
  handleCategoryClick?: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  handleCategoryClick,
}) => {
  const tabDevice = useMedia("(max-width: 1001px)");
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };
  return (
    <div className={styles.container}>
      <Image
        onClick={goHome}
        className={styles.logo}
        src="/logo.svg"
        alt="Profile picture of Rex"
        width={200}
        height={200}
        priority // optional: preloads the image for better performance
      />
      {tabDevice ? (
        <MobileHeader />
      ) : (
        <>
          <div className={styles.menuDiv}>
            {["Men", "Ladies", "Kids", "Accessories"].map((cat) => (
              <label
                key={cat}
                onClick={() => {
                  if (handleCategoryClick) {
                    handleCategoryClick(cat);
                  }
                }}
                style={{
                  cursor: "pointer",
                  color: selectedCategory === cat ? "#513cbf" : "inherit",
                }}
              >
                {cat}
              </label>
            ))}
          </div>
          <div className={styles.searchDiv}>
            <div className={styles.search}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => {
                  if (setSearchTerm) {
                    setSearchTerm(e.target.value);
                  }
                }}
                className={styles.searchInput}
              />
            </div>
            <div className="h-full flex flex-row items-center gap-5">
              <LiaBell style={{ fontSize: "20px", cursor: "pointer" }} />

              <PiUser style={{ fontSize: "20px", cursor: "pointer" }} />
              <div className={styles.avatarWrapper}>
                <Image
                  src={Profile}
                  alt="Profile picture"
                  width={40}
                  height={40}
                  className={styles.avatar}
                />
              </div>
            </div>
            <div className="flex flex-row gap-5 self-center">
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                type="button"
                href="/auth"
              >
                Login
              </a>
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                type="button"
                href="/auth"
              >
                Register
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
