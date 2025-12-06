import React from "react";
import CreateAdmin from "@/components/auth/CreateAdmin";
import styles from "@/styles/Auth/Auth.module.css";
import Header from "@/components/global/header/Header";

const page = () => {
  return (
    <div className={styles.container}>
      <Header />
      <CreateAdmin />
    </div>
  );
};

export default page;
