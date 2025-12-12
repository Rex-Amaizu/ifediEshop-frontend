"use client";
import React from "react";
import styles from "@/styles/AdminDashboard/Admin.module.css";
import SideMenu from "@/components/admin-dashboard/SideMenu";
import Total from "@/components/admin-dashboard/total/Total";
import Recent from "@/components/admin-dashboard/recent/Recent";
import { useMedia } from "@/hooks/useResponsive";
import MobileSideMenu from "@/components/admin-dashboard/MobileSideMenu";
import AdminGuard from "@/utils/AdminGuard";

const page = () => {
  const mobileDevice = useMedia("(max-width: 780px)");
  return (
    <React.Fragment>
      <AdminGuard>
        <div className={styles.container}>
          {mobileDevice ? (
            <div className="absolute mt-2.5">
              <MobileSideMenu />
            </div>
          ) : (
            <div className={styles.box1}>
              <SideMenu />
            </div>
          )}
          <div className={styles.box2}>
            <Total />
            <Recent />
            <Recent />
          </div>
        </div>
      </AdminGuard>
    </React.Fragment>
  );
};

export default page;
