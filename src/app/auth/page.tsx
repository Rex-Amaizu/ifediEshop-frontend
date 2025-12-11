"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/Auth/Auth.module.css";
import Header from "@/components/global/header/Header";
import SignUp from "@/components/auth/SignUp";
import Login from "@/components/auth/Login";
import { useSearchParams } from "next/navigation";

const AuthPage = () => {
  const [authState, setAuthState] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");

  const toggleAuth = () => {
    setAuthState((prev) => !prev);
  };

  useEffect(() => {
    if (mode === "login") setAuthState(false);
    if (mode === "register") setAuthState(true);
  }, [mode]);
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
