"use client";
import React, { useEffect } from "react";
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
import { TiShoppingCart } from "react-icons/ti";
import { fetchCart } from "@/redux/slices/cartSlice";

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

  const { user, refreshToken } = useAppSelector((state) => state.auth);
  const { data: cart, totalAmount } = useAppSelector((state) => state.cart);
  const { data: categories } = useAppSelector((s) => s.categories);

  const goHome = () => {
    router.push("/");
  };

  const logout = () => {
    if (!refreshToken) return;
    dispatch(logoutUser(refreshToken));
  };

  const goToAdmin = () => {
    router.push("/dashboard-73450");
  };

  const goToCart = () => {
    router.push("/cart");
  };

  useEffect(() => {
    if (user?._id) dispatch(fetchCart());
  }, [dispatch, user?._id]);

  if (!mounted) return null;

  // console.log("cart", cart);
  // console.log("cartlength", cart?.length);

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
            {categories?.map((cat) => (
              <label
                key={cat._id}
                onClick={() => handleCategoryClick?.(cat._id)}
                style={{
                  cursor: "pointer",
                  color: selectedCategory === cat._id ? "#513cbf" : "inherit",
                }}
              >
                {cat.name}
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
              <div className="flex relative" onClick={goToCart}>
                <TiShoppingCart
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
                <div
                  className="relative"
                  style={{
                    display: mounted && cart?.length > 0 ? "flex" : "none",
                  }}
                >
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs font-semibold text-white">
                    {cart.length > 0 ? cart.length : 0}
                  </span>
                </div>
              </div>
            </div>
            <div
              className="flex flex-row gap-5 self-center"
              style={{ display: mounted && user ? "flex" : "none" }}
            >
              <a
                className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
                href="#"
                onClick={goToAdmin}
                style={{
                  display: user?.role === "admin" ? "flex" : "none",
                }}
              >
                admin page
              </a>
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
