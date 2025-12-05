"use client";
import React, { useState } from "react";
import Image from "next/image";
import { LiaBell } from "react-icons/lia";
import { PiUser } from "react-icons/pi";
import Profile from "../../../../public/profile.png";
import { GiHamburgerMenu } from "react-icons/gi";
import styles from "@/styles/Header/Header.module.css";
import { CiSearch } from "react-icons/ci";
import { IoClose } from "react-icons/io5";

const MobileHeader = () => {
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleSearch = () => setOpenSearch((prev) => !prev);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <div className={styles.mobileContainer}>
      {openSearch && (
        <div className={styles.searchMobile}>
          <div>
            <input type="text" placeholder="Search..." />
          </div>
        </div>
      )}
      {!menuOpen && (
        <div className={styles.searchDiv}>
          <div className={styles.search}>
            <CiSearch onClick={toggleSearch} />
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
          <li>Men</li>
          <li>Ladies</li>
          <li>Kids</li>
          <li>Accessories</li>
          <div className="flex flex-col gap-5">
            <a
              className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e hover:bg-[#513cbf] cursor-pointer"
              type="button"
              href=""
            >
              Login
            </a>
            <a
              className="w-[100px] h-[30px] rounded-sm flex items-center justify-center text-white bg-[#21184e] hover:bg-[#513cbf] cursor-pointer"
              type="button"
              href=""
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
