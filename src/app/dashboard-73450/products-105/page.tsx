"use client";
import React, { useState } from "react";
import styles from "@/styles/AdminDashboard/ProductAdmin.module.css";
import SideMenu from "@/components/admin-dashboard/SideMenu";
import Total from "@/components/admin-dashboard/total/Total";
import Recent from "@/components/admin-dashboard/recent/Recent";
import { useMedia } from "@/hooks/useResponsive";
import ProductAdminHeader from "@/components/admin-dashboard/productadmin/ProductAdminHeader";
import ProductsMain from "@/components/admin-dashboard/productadmin/ProductsMain";
import Footer from "@/components/global/footer/Footer";
import CreateProductModal from "@/components/admin-dashboard/productadmin/CreateProductModal";

const page = () => {
  const mobileDevice = useMedia("(max-width: 780px)");
  const [openCreateModal, setOpenCreateModal] = useState<boolean>(false);

  const toggleModal = () => {
    setOpenCreateModal((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <ProductAdminHeader />
        <hr className="text-[#f2f2f2]" />
      </div>
      <div className={styles.box2}>
        <div className="flex flex-row items-center justify-between px-5 w-full">
          <label className="text-[10px] smx:text-sm ms:text-lg font-bold">
            Product Inventory Management
          </label>
          <button
            onClick={toggleModal}
            className="h-6 smx:h-8 sm:h-10 w-[100px] smx:w-[120px] sm:w-[150px] text-[8px] smx:text-[10px] font-semibold sm:text-xs cursor-pointer flex items-center justify-center text-white bg-[#513cbf] rounded-sm"
          >
            Create New Product
          </button>
        </div>
      </div>
      <div className={styles.box3}>
        <ProductsMain />
      </div>
      <div className="flex flex-col items-start px-5 mt-5 bg-[#f2f2f2] h-auto ms:h-[200px]">
        <Footer />
      </div>
      <CreateProductModal isOpen={openCreateModal} onClose={toggleModal} />
    </div>
  );
};

export default page;
