import React from "react";
import Image from "next/image";
import styles from "@/styles/Footer.module.css";
import { CiTwitter } from "react-icons/ci";
import { FaInstagram } from "react-icons/fa";
import { CiFacebook } from "react-icons/ci";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.iconDiv}>
        <Image
          className={styles.logo}
          src="/logo.svg"
          alt="Profile picture of Rex"
          priority // optional: preloads the image for better performance
          width={200}
          height={200}
        />
        <p className="text-sm font-medium text-[#999999]">
          Elegant fashion for the modern Individual
        </p>
      </div>
      <div className={styles.linkDiv}>
        <div className="flex flex-col start gap-2.5">
          <label className="text-lg font-extrabold text-black">
            Quick Links
          </label>
          <ul>
            <li className="text-sm font-medium text-[#999999]">About Us</li>
            <li className="text-sm font-medium text-[#999999]">Contact</li>
            <li className="text-sm font-medium text-[#999999]">FAQ</li>
            <li className="text-sm font-medium text-[#999999]">
              Privacy Policy
            </li>
            <li className="text-sm font-medium text-[#999999]">
              Terms Of Service
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.socialDiv}>
        <label className="text-lg font-extrabold text-black">Follow Us</label>
        <div className={styles.socials}>
          <CiTwitter />
          <FaInstagram />
          <CiFacebook />
        </div>
      </div>
    </div>
  );
};

export default Footer;
