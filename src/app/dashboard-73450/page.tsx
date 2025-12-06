import React from "react";
import styles from "@/styles/AdminDashboard/Admin.module.css";
import SideMenu from "@/components/admin-dashboard/SideMenu";
import Total from "@/components/admin-dashboard/total/Total";
import Recent from "@/components/admin-dashboard/recent/Recent";

const page = () => {
  return (
    <div className={styles.container}>
      <div className={styles.box1}>
        <SideMenu />
      </div>
      <div className={styles.box2}>
        <Total />
        <Recent />
        <Recent />
      </div>
    </div>
  );
};

export default page;
