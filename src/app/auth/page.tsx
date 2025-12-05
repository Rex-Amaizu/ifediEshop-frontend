"use client";
import React, { useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import Header from "@/components/global/header/Header";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";

const AuthPage = () => {
  const [authState, setAuthState] = useState<boolean>(true);

  const toggleAuth = () => {
    setAuthState((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <Header />
      {authState ? (
        <SignUp toggleAuth={toggleAuth} />
      ) : (
        <Login toggleAuth={toggleAuth} />
      )}
    </div>
  );
};

export default AuthPage;
