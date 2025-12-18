"use client";
import LandingPage from "@/components/landingpage/LandingPage";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { refreshAccessToken, updateToken } from "@/redux/slices/authSlice";
import { attachResponseInterceptor } from "@/utils/axiosClient";

export default function Home() {
  const dispatch = useAppDispatch();

  const { token, refreshToken } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (refreshToken && !token) {
      dispatch(refreshAccessToken());
    }
  }, [dispatch, refreshToken, token]);

  return (
    <>
      <LandingPage />
    </>
  );
}
