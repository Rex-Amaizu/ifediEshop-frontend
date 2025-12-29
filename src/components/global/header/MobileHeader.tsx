"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { LiaBell } from "react-icons/lia";
import { PiUser } from "react-icons/pi";
import Profile from "../../../../public/profile.png";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/Header/Header.module.css";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
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

const MobileHeader: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  handleCategoryClick,
}) => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const router = useRouter();
  const mounted = useMounted();
  const dispatch = useAppDispatch();

  const { user, refreshToken } = useAppSelector((state) => state.auth);
  const { data: cart, totalAmount } = useAppSelector((state) => state.cart);

  const toggleSearch = () => setOpenSearch((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

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

  return (
    <div className={styles.mobileContainer}>
      {openSearch && (
        <div className={styles.searchMobile}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm?.(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>
      )}
      {!menuOpen && (
        <div className={styles.searchDiv}>
          <div className={styles.search}>
            <CiSearch onClick={toggleSearch} />
          </div>
          <div
            className="flex flex-row items-center gap-5 h-10"
            style={{ visibility: mounted && user ? "visible" : "hidden" }}
          >
            <LiaBell style={{ fontSize: "20px", cursor: "pointer" }} />

            <div className="flex relative" onClick={goToCart}>
              <TiShoppingCart style={{ fontSize: "20px", cursor: "pointer" }} />
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
        </div>
      )}
      <GiHamburgerMenu
        onClick={toggleMenu}
        style={{ fontSize: "25px", cursor: "pointer" }}
      />
      <div
        className={`${styles.sideMenu} ${menuOpen ? styles.sideMenuOpen : ""}`}
      >
        <div className={styles.sideMenuHeader}>
          <IoClose
            onClick={toggleMenu}
            style={{ fontSize: "28px", cursor: "pointer" }}
          />
        </div>
        <ul className={styles.sideMenuList}>
          {["Men", "Ladies", "Kids", "Accessories"].map((cat) => (
            <li
              key={cat}
              onClick={() => handleCategoryClick?.(cat)}
              style={{
                cursor: "pointer",
                color: selectedCategory === cat ? "#513cbf" : "inherit",
              }}
            >
              {cat}
            </li>
          ))}

          <div
            className="flex flex-col gap-5"
            style={{ visibility: mounted && user ? "visible" : "hidden" }}
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
              type="button"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Log out
            </a>
          </div>

          <div
            className="flex flex-col gap-5"
            style={{ visibility: mounted && !user ? "visible" : "hidden" }}
          >
            <a
              className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
              type="button"
              href="/auth?mode=login"
            >
              Login
            </a>
            <a
              className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
              type="button"
              href="/auth?mode=register"
            >
              Register
            </a>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default MobileHeader;
