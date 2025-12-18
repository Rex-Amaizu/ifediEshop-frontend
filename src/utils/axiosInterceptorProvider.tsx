"use client";

import { useEffect } from "react";
import { attachResponseInterceptor } from "@/utils/axiosClient";
import { useAppDispatch } from "@/redux/hooks";
import { updateToken } from "@/redux/slices/authSlice";

export default function AxiosInterceptorProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    attachResponseInterceptor((newToken: string) => {
      dispatch(updateToken(newToken));
    });
  }, [dispatch]);

  return <>{children}</>;
}
