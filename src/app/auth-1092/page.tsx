import React from "react";
import CreateAdmin from "@/components/auth/CreateAdmin";
import styles from "@/styles/Auth/Auth.module.css";
import Header from "@/components/global/header/Header";
import AdminGuard from "@/utils/AdminGuard";

const page = () => {
  return (
    <div className={styles.container}>
      <Header />
      <AdminGuard>
        <CreateAdmin />
      </AdminGuard>
    </div>
  );
};

export default page;
