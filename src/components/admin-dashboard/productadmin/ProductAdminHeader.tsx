"use client";
import React from "react";
import { usePathname } from "next/navigation";

const ProductAdminHeader = () => {
  const pathname = usePathname();

  const linkClasses = (path: string) =>
    pathname === path
      ? "text-[#513cbf] font-semibold underline text-xs sm:text-sm"
      : "text-gray-600 hover:text-[#513cbf] text-xs sm:text-sm";

  return (
    <div className="flex flex-row gap-2.5 w-full items-center justify-center h-full">
      <a className={linkClasses("/dashboard-73450")} href="/dashboard-73450">
        Dashboard
      </a>

      <a
        className={linkClasses("/dashboard-73450/products-105/")}
        href="/dashboard-73450/products-105/"
      >
        Products
      </a>

      <a
        className={linkClasses("/dashboard-73450/categories-105/")}
        href="/dashboard-73450/categories-105/"
      >
        Categories
      </a>

      <a
        className={linkClasses("/dashboard-73450/videos-105/")}
        href="/dashboard-73450/videos-105/"
      >
        Videos
      </a>

      <a className={linkClasses("/")} href="/">
        Store
      </a>
    </div>
  );
};

export default ProductAdminHeader;
