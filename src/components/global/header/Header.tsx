"use client";
import React from "react";
import Image from "next/image";
import styles from "@/styles/Header/Header.module.css";
import { LiaBell } from "react-icons/lia";
import { PiUser } from "react-icons/pi";
import { useMedia } from "@/hooks/useResponsive";
import MobileHeader from "./MobileHeader";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useMounted } from "@/hooks/useMounted";
import { logoutUser } from "@/redux/slices/authSlice";

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
  const mounted = useMounted();
  const dispatch = useAppDispatch();
  const { user, token } = useAppSelector((state) => state.auth);

  const goHome = () => {
    router.push("/");
  };

  const logout = () => {
    if (!user?._id || !token) return;

    dispatch(
      logoutUser({
        token,
        userId: user._id,
      })
    );
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
        priority
      />

      {tabDevice ? (
        <MobileHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          handleCategoryClick={handleCategoryClick}
        />
      ) : (
        <>
          <div className={styles.menuDiv}>
            {["Men", "Ladies", "Kids", "Accessories"].map((cat) => (
              <label
                key={cat}
                onClick={() => handleCategoryClick?.(cat)}
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
                onChange={(e) => setSearchTerm?.(e.target.value)}
                className={styles.searchInput}
              />
            </div>

            {/* Bell Icon - always rendered, hide/show with visibility */}
            <div
              className="flex flex-row items-center gap-5 h-10"
              style={{ display: mounted && user ? "flex" : "none" }}
            >
              <LiaBell style={{ fontSize: "20px", cursor: "pointer" }} />
              {/* Optionally add profile avatar here */}
            </div>
            <div
              className="flex flex-row gap-5 self-center"
              style={{ display: mounted && user ? "flex" : "none" }}
            >
              {" "}
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Log out
              </a>
            </div>

            {/* Login/Register Links - always rendered, hide when user exists */}
            <div
              className="flex flex-row gap-5 self-center"
              style={{ display: mounted && !user ? "flex" : "none" }}
            >
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                href="/auth?mode=login"
              >
                Login
              </a>
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                href="/auth?mode=register"
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
