import React from "react";
import styles from "@/styles/AdminDashboard/Admin.module.css";
import Box3 from "@/components/admin-dashboard/Box3";
import Box4 from "@/components/admin-dashboard/Box4";
import SideMenu from "@/components/admin-dashboard/SideMenu";
import Total from "@/components/admin-dashboard/total/Total";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <SideMenu />
      </div>
      <div className={styles.box2}>
        <Total />
      </div>
    </div>
  );
};

export default page;
